import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// プロジェクトルート
export const PROJECT_ROOT = join(__dirname, "..", "..", "..");
export const SHARED_DIR = join(PROJECT_ROOT, "shared");

// 共有リソース
export const DESIGN_TOKENS_PATH = join(SHARED_DIR, "design-tokens.json");
export const SCHEMAS_DIR = join(SHARED_DIR, "schemas");

