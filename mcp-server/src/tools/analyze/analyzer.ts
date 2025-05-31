import { readdirSync, statSync } from "fs";
import { join } from "path";
import {
  ComponentStructure,
  ComponentFiles,
  FileInfo,
} from "../../core/types/index.js";

export class StructureAnalyzer {
  analyze(componentPath: string): ComponentStructure {
    const componentName = componentPath.split("/").pop() ?? "";

    const structure: ComponentStructure = {
      hasStyles: false,
      hasTests: false,
      hasStories: false,
      hasIndex: false,
      files: [],
    };

    try {
      const files = readdirSync(componentPath);
      structure.files = files;

      // Check for required files
      structure.hasStyles = files.some(
        (f) =>
          f === `${componentName}.css` || f === `${componentName}.module.css`,
      );
      structure.hasTests = files.some(
        (f) => f.includes(".test.") || f.includes(".spec."),
      );
      structure.hasStories = files.some((f) => f.includes(".stories."));
      structure.hasIndex =
        files.includes("index.ts") || files.includes("index.tsx");
    } catch (error) {
      console.error(`Error analyzing component structure: ${error}`);
    }

    return structure;
  }
}

export class FileAnalyzer {
  analyze(componentDir: string): ComponentFiles {
    const files: FileInfo[] = [];

    try {
      const items = readdirSync(componentDir);

      for (const item of items) {
        const fullPath = join(componentDir, item);
        const stats = statSync(fullPath);

        if (!stats.isDirectory()) {
          const fileType = this.getFileType(item);
          files.push({
            name: item,
            type: fileType,
            path: fullPath,
          });
        }
      }
    } catch (error) {
      console.error(`Error analyzing files: ${error}`);
    }

    return { files };
  }

  private getFileType(filename: string): string {
    if (filename.includes(".test.") || filename.includes(".spec.")) {
      return "test";
    }
    if (filename.includes(".stories.")) {
      return "story";
    }
    if (filename.endsWith(".css") || filename.endsWith(".module.css")) {
      return "style";
    }
    if (filename.endsWith(".tsx") || filename.endsWith(".ts")) {
      return "component";
    }
    return "other";
  }
}

