-- Règles des articles appliquées en base (docs/PLAN.md, « Schéma » et « Autorisations »).
-- Lancé par `supabase test db`, après `db reset` : le seed est présent, les tests n'en dépendent pas.
begin;

select plan(12);

insert into public.articles (id, slug, title)
values ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'test-brouillon', 'Brouillon de test');

select is(
  (select status::text from public.articles where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  'draft',
  'un brouillon s''enregistre avec son seul titre'
);

select throws_ok(
  $$ insert into public.articles (slug, title) values ('Pas Un Slug', 'Titre') $$,
  '23514',
  null,
  'un slug hors a-z, 0-9 et tirets est refusé'
);

select throws_ok(
  $$ insert into public.articles (slug, title) values ('test-brouillon', 'Autre titre') $$,
  '23505',
  null,
  'un slug déjà pris est refusé'
);

select throws_ok(
  $$ update public.articles set status = 'published' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  '23514',
  null,
  'un article incomplet ne peut pas être publié'
);

update public.articles
set excerpt = 'Chapô de test.',
    category = 'digitalisation',
    body = 'Corps de test.',
    cover_path = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/couverture.png',
    cover_alt = 'Couverture de test'
where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

select throws_ok(
  $$ update public.articles set status = 'published', cover_alt = '  ' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  '23514',
  null,
  'une couverture sans texte alternatif bloque la publication'
);

update public.articles set status = 'published' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

select isnt(
  (select first_published_at from public.articles where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  null,
  'la première publication remplit first_published_at'
);

select throws_ok(
  $$ update public.articles set slug = 'nouveau-slug' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  'P0001',
  'Le slug ne change plus après publication.',
  'le slug est figé après la première publication'
);

-- On antidate la publication pour vérifier qu'elle survit à la dépublication et à la republication.
alter table public.articles disable trigger articles_before_write;
update public.articles set first_published_at = '2026-01-15 10:00:00+01' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
alter table public.articles enable trigger articles_before_write;

update public.articles set status = 'draft' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
update public.articles set status = 'published', first_published_at = null where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

select is(
  (select first_published_at from public.articles where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  '2026-01-15 10:00:00+01'::timestamptz,
  'la date de première publication est conservée à la republication'
);

select throws_ok(
  $$ update public.articles set status = 'draft', slug = 'autre-slug' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' $$,
  'P0001',
  'Le slug ne change plus après publication.',
  'le slug reste figé une fois l''article dépublié'
);

insert into public.articles (id, slug, title)
values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'test-invisible', 'Brouillon invisible');

set local role anon;

select is(
  (select count(*) from public.articles where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  0::bigint,
  'un brouillon reste invisible pour anon'
);

select is(
  (select count(*) from public.articles where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  1::bigint,
  'un article publié est visible pour anon'
);

select throws_ok(
  $$ insert into public.articles (slug, title) values ('ecrit-par-anon', 'Anonyme') $$,
  '42501',
  null,
  'anon ne peut pas écrire'
);

reset role;

select * from finish();

rollback;
