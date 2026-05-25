import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const targets = [
  path.join(
    rootDir,
    "node_modules",
    "@tanstack",
    "router-plugin",
    "dist",
    "esm",
    "core",
    "code-splitter",
    "compilers.js",
  ),
  path.join(
    rootDir,
    "node_modules",
    "@tanstack",
    "router-plugin",
    "dist",
    "cjs",
    "core",
    "code-splitter",
    "compilers.cjs",
  ),
];

const replacements = [
  {
    from: "template.statement(`const ${splitNodeMeta.localImporterIdent} = () => import('${splitUrl}')`)()",
    to: "template.statement(`const ${splitNodeMeta.localImporterIdent} = () => import(${JSON.stringify(splitUrl)})`)()",
  },
  {
    from: "_babel_template.statement(`const ${splitNodeMeta.localImporterIdent} = () => import('${splitUrl}')`)()",
    to: "_babel_template.statement(`const ${splitNodeMeta.localImporterIdent} = () => import(${JSON.stringify(splitUrl)})`)()",
  },
];

let patchedAny = false;

for (const filePath of targets) {
  if (!fs.existsSync(filePath)) continue;

  let source = fs.readFileSync(filePath, "utf8");
  const original = source;

  for (const { from, to } of replacements) {
    source = source.split(from).join(to);
  }

  if (source !== original) {
    fs.writeFileSync(filePath, source);
    patchedAny = true;
    console.log(`Patched ${path.relative(rootDir, filePath)}`);
  }
}

if (!patchedAny) {
  console.log("No router plugin patch changes were needed.");
}
