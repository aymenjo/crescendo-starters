import { join } from "node:path";
import { checkNeeds } from "../lib/need-guard";
import { isIndexable } from "../lib/site";

async function main() {
  const indexable = isIndexable();
  const { ok, needs } = await checkNeeds({ dir: join(process.cwd(), "content"), indexable });
  const list = needs.map(({ file, need }) => `  - content/${file} : ${need}`).join("\n");

  if (!ok) {
    console.error(`SITE_INDEXABLE=true, mais il reste ${needs.length} [NEED] à fournir :\n${list}`);
    process.exit(1);
  }
  if (needs.length > 0) {
    console.log(`${needs.length} [NEED] restants (autorisés tant que le site n'est pas indexable) :\n${list}`);
  } else {
    console.log("Aucun [NEED] restant.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
