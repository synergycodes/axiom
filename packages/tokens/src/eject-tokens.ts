import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import tokens from "../tokens.json";
import { toFileName } from "./to-file-name";
import { TOKEN_OUTPUT_DIR } from "./constants";

export function ejectTokens(): void {
  try {
    if (!existsSync(TOKEN_OUTPUT_DIR)) {
      mkdirSync(TOKEN_OUTPUT_DIR, { recursive: true });
    }

    // Filter out tokens metadata to get themes
    const themes = Object.entries(tokens).filter(
      ([name]) => !name.startsWith("$"),
    );

    for (const [name, theme] of themes) {
      const fileName = toFileName(name);

      const outputFilePath = join(TOKEN_OUTPUT_DIR, `${fileName}.json`);
      console.log(outputFilePath);

      // Write the property value to a new JSON file
      writeFileSync(outputFilePath, JSON.stringify(theme, null, 2), "utf8");
    }
  } catch (error) {
    console.error("Error extracting JSON properties:", error);
  }
}
