import { rm } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve(process.cwd(), "_site");

await rm(outputDirectory, { recursive: true, force: true });
console.log(`Removed ${outputDirectory}`);
