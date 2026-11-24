import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [
			"dist",
			"node_modules",
			"playwright-report",
			"test-results",
			// Nested git worktrees carry their own tsconfig/eslint config.
			".claude/worktrees/**",
			".wrangler",
		],
	},
	{
		extends: [
			...tseslint.configs.recommended,
			reactHooks.configs.flat["recommended-latest"],
			reactRefresh.configs.vite,
		],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
			parserOptions: { tsconfigRootDir: import.meta.dirname },
		},
	},
	{
		// Pages Functions run in the Workers runtime, not the browser.
		files: ["functions/**/*.ts"],
		languageOptions: { globals: globals.serviceworker },
		rules: { "react-refresh/only-export-components": "off" },
	}
);
