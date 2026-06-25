// One-time (idempotent) image optimizer for the week galleries.
//
// What it does:
//   - Resizes every photo so its longest side is <= MAX_EDGE px
//   - Re-encodes JPEG/PNG at QUALITY using mozjpeg
//   - Overwrites the file in src/assets/weeks IN PLACE (imports stay identical)
//
// Safety:
//   - The first time it touches an image it copies the pristine original into
//     ./.image-originals/<same path>. On every run it compresses FROM that
//     backup, so re-running never double-compresses and you can always restore.
//
// Usage:  node scripts/optimize-images.mjs
//         node scripts/optimize-images.mjs --restore   (put originals back)

import sharp from "sharp";
import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src", "assets", "weeks");
const BACKUP_DIR = path.join(ROOT, ".image-originals");

const MAX_EDGE = 1280; // longest side in px — lightbox is capped at ~85vh (~900px)
const QUALITY = 72;
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

const restore = process.argv.includes("--restore");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function kb(bytes) {
  return (bytes / 1024).toFixed(0).padStart(5);
}

async function ensureDir(file) {
  await mkdir(path.dirname(file), { recursive: true });
}

async function run() {
  let count = 0;
  let before = 0;
  let after = 0;

  for await (const file of walk(SRC_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTS.has(ext)) continue;

    const rel = path.relative(SRC_DIR, file);
    const backup = path.join(BACKUP_DIR, rel);

    if (restore) {
      if (existsSync(backup)) {
        await copyFile(backup, file);
        console.log(`restored  ${rel}`);
      }
      continue;
    }

    // Make sure a pristine backup exists, and always read from it.
    if (!existsSync(backup)) {
      await ensureDir(backup);
      await copyFile(file, backup);
    }
    const source = backup;

    const origSize = (await stat(source)).size;

    let pipeline = sharp(source).resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
    pipeline =
      ext === ".png"
        ? pipeline.png({ quality: QUALITY, compressionLevel: 9 })
        : pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

    const buf = await pipeline.toBuffer();
    const { writeFile } = await import("node:fs/promises");
    await writeFile(file, buf);

    before += origSize;
    after += buf.length;
    count++;
    console.log(
      `${rel.padEnd(22)} ${kb(origSize)} KB -> ${kb(buf.length)} KB`
    );
  }

  if (restore) {
    console.log("\nRestore complete.");
    return;
  }

  console.log(
    `\n${count} images   ${(before / 1024 / 1024).toFixed(1)} MB -> ${(
      after /
      1024 /
      1024
    ).toFixed(1)} MB   (originals safe in .image-originals/)`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
