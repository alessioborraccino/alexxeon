import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
await mkdir("public/images", { recursive: true });
for (const file of await readdir("assets/originals")) {
  const name = path.parse(file).name;
  for (const width of [640, 1280]) {
    const input = sharp(`assets/originals/${file}`)
      .rotate()
      .resize(width, Math.round((width * 2) / 3), { fit: "cover" });
    await input
      .clone()
      .webp({ quality: 78 })
      .toFile(`public/images/${name}-${width}.webp`);
    await input
      .clone()
      .avif({ quality: 50 })
      .toFile(`public/images/${name}-${width}.avif`);
  }
}
const logo = await sharp("public/full-logo-white.svg")
  .resize(800)
  .png()
  .toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#075047" },
})
  .composite([{ input: logo, gravity: "center" }])
  .jpeg({ quality: 85 })
  .toFile("public/og-image.jpg");
console.log(
  "Generated responsive photos and social preview. Originals stay outside public output.",
);
