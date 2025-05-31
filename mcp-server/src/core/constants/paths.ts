import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// プロジェクトルート
export const PROJECT_ROOT = join(__dirname, "..", "..", "..", "..");

// 共有リソース
export const DESIGN_TOKENS_PATH = join(PROJECT_ROOT, "design-tokens", "tokens.json");
export const SCHEMAS_DIR = join(PROJECT_ROOT, "schemas");

