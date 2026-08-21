import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("index.html", "dist/index.html");
await cp("styles.css", "dist/styles.css");
await cp("script.js", "dist/script.js");
await cp("assets", "dist/assets", { recursive: true });
await cp(".openai", "dist/.openai", { recursive: true });

const textFiles = {
  "/": await readFile("index.html", "utf8"),
  "/index.html": await readFile("index.html", "utf8"),
  "/styles.css": await readFile("styles.css", "utf8"),
  "/script.js": await readFile("script.js", "utf8")
};

const binaryFiles = {};
for (const fileName of await readdir("assets")) {
  const filePath = path.join("assets", fileName);
  binaryFiles[`/assets/${fileName}`] = (await readFile(filePath)).toString("base64");
}

const worker = `const textFiles = ${JSON.stringify(textFiles)};
const binaryFiles = ${JSON.stringify(binaryFiles)};
const contentTypes = {
  "/": "text/html; charset=utf-8",
  "/index.html": "text/html; charset=utf-8",
  "/styles.css": "text/css; charset=utf-8",
  "/script.js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

function binaryFromBase64(value) {
  const raw = atob(value);
  const bytes = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index += 1) bytes[index] = raw.charCodeAt(index);
  return bytes;
}

function typeFor(pathname) {
  if (contentTypes[pathname]) return contentTypes[pathname];
  const lower = pathname.toLowerCase();
  for (const extension of [".png", ".jpg", ".jpeg"]) {
    if (lower.endsWith(extension)) return contentTypes[extension];
  }
  return "application/octet-stream";
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\\/$/, "");
    const headers = {
      "content-type": typeFor(pathname),
      "cache-control": pathname === "/" || pathname === "/index.html" ? "no-cache" : "public, max-age=31536000, immutable"
    };

    if (textFiles[pathname]) return new Response(textFiles[pathname], { headers });
    if (binaryFiles[pathname]) return new Response(binaryFromBase64(binaryFiles[pathname]), { headers });
    return new Response(textFiles["/"], { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" } });
  }
};
`;

await writeFile("dist/index.js", worker, "utf8");

console.log("Static landing copied to dist/");
