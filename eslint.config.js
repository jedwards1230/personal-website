import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist", "node_modules", "playwright-report", "test-results"] },
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
		},
	}
);
