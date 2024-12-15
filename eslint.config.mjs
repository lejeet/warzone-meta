import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disabling specific rules
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      // Potentially add other specific TypeScript rules you wish to disable
    }
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      // Disable all TypeScript rules by prefixing with the plugin name
      "@typescript-eslint/*": "off"
    }
  }
];

export default eslintConfig;