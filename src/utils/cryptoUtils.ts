import { createHash } from "crypto";

export const hashFileContent = (content: string): string =>
  createHash("sha1").update(content, "utf-8").digest("hex");
