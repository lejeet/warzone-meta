import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Change specific rules to 'warn' instead of 'off' to not fail builds but still report
      "react/no-unescaped-entities": "warn",
      "@next/next/no-img-element": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    }
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      // If you prefer to not disable all TypeScript rules globally, consider specifying 'warn' for key rules
      // "@typescript-eslint/*": "off"  // This line can be commented out if not disabling all rules
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/no-var-requires": "warn",
    }
  }
];

export default eslintConfig;