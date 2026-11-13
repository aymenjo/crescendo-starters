-- Articles du blog et leurs images (docs/PLAN.md, « Schéma », « Stockage », « Autorisations »).
-- Les règles métier vivent en base : un article publié est complet, et son slug ne change plus
-- après la première publication.

create type public.article_status as enum ('draft', 'published');

create type public.article_category as enum (
  'automatisation-ia',
  'outils-no-code',
  'digitalisation',
  'cas-clients'
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  excerpt text not null default '',
  category public.article_category,
  body text not null default '',
  cover_path text,
  cover_alt text,
  seo_title text,
  meta_description text,
  status public.article_status not null default 'draft',
  first_published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint articles_slug_key unique (slug),
  constraint articles_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  -- Un brouillon s'enregistre dès qu'il a un titre.
  constraint articles_title_present check (btrim(title) <> ''),
  -- Un article publié a tous ses champs obligatoires.
  constraint articles_published_complete check (
    status <> 'published'
    or (
      btrim(excerpt) <> ''
      and category is not null
      and btrim(body) <> ''
      and coalesce(btrim(cover_path), '') <> ''
      and coalesce(btrim(cover_alt), '') <> ''
    )
  )
);

comment on table public.articles is 'Articles du blog (le carnet), écrits dans l''admin.';
comment on column public.articles.excerpt is 'Chapô : extrait des cartes et meta description par défaut.';
comment on column public.articles.seo_title is 'Nul : on retombe sur le titre.';
comment on column public.articles.meta_description is 'Nulle : on retombe sur le chapô.';
comment on column public.articles.first_published_at is 'Date affichée : remplie à la première publication, jamais effacée.';

create index articles_published_idx on public.articles (first_published_at desc) where status = 'published';

-- updated_at, première publication et slug figé.
create function public.articles_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' then
    if old.first_published_at is not null and new.slug is distinct from old.slug then
      raise exception 'Le slug ne change plus après publication.'
        using errcode = 'P0001', hint = 'articles_slug_locked';
    end if;
    new.created_at := old.created_at;
    -- La date de première publication est conservée à la republication.
    new.first_published_at := old.first_published_at;
    new.updated_at := now();
  end if;

  if new.status = 'published' and new.first_published_at is null then
    new.first_published_at := now();
  end if;

  return new;
end;
$$;

create trigger articles_before_write
before insert or update on public.articles
for each row execute function public.articles_before_write();

-- RLS : le public lit les articles publiés, l'admin (seul utilisateur possible) lit et écrit tout.
alter table public.articles enable row level security;

revoke all on table public.articles from anon, authenticated;
grant select on table public.articles to anon;
grant select, insert, update, delete on table public.articles to authenticated;

create policy "Le public lit les articles publiés"
on public.articles for select
to anon
using (status = 'published');

create policy "L'admin lit et écrit tous les articles"
on public.articles for all
to authenticated
using (true)
with check (true);

-- Bucket des images : lecture publique, JPEG, PNG ou WebP, 5 Mo au plus. Fichiers sous <article_id>/….
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('articles', 'articles', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Écriture et suppression réservées à l'admin. La lecture publique passe par l'URL publique du bucket ;
-- la politique de lecture sert à lister les fichiers d'un article avant de les supprimer.
create policy "L'admin liste les images des articles"
on storage.objects for select
to authenticated
using (bucket_id = 'articles');

create policy "L'admin téléverse les images des articles"
on storage.objects for insert
to authenticated
with check (bucket_id = 'articles');

create policy "L'admin remplace les images des articles"
on storage.objects for update
to authenticated
using (bucket_id = 'articles')
with check (bucket_id = 'articles');

create policy "L'admin supprime les images des articles"
on storage.objects for delete
to authenticated
using (bucket_id = 'articles');
