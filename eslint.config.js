import eslint from "@eslint/js";
import prettierPlugin from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config(
	{
		// Globally ignored files
		ignores: ["dist", "bun.lockb", ".turbo", ".next/**", "node_modules"],
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"@next/next": nextPlugin,
			import: importPlugin,
		},
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			prettierPlugin,
		],
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
			// TypeError: context.getAncestors is not a function
			"@next/next/no-duplicate-head": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					prefer: "type-imports",
					fixStyle: "separate-type-imports",
				},
			],
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/no-non-null-assertion": "error",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/strict-boolean-expressions": 0,
			"@typescript-eslint/no-unsafe-argument": 0,
			"@typescript-eslint/no-empty-function": 0,
			"@typescript-eslint/no-floating-promises": 0,
			"@typescript-eslint/no-unsafe-return": 0,
			"@typescript-eslint/unbound-method": 0,
			"@typescript-eslint/require-await": 0,
			"@typescript-eslint/no-unsafe-call": 0,
			"@typescript-eslint/no-unnecessary-condition": 0,
			"@typescript-eslint/no-explicit-any": 0,
			"@typescript-eslint/ban-ts-comment": 0,
			"@typescript-eslint/no-redeclare": "off",
			"import/consistent-type-specifier-style": "off",
		},
	},
	{
		linterOptions: { reportUnusedDisableDirectives: true },
		languageOptions: { parserOptions: { project: true } },
	}
);
