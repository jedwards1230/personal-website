/** @type {import('prettier').Config} */
module.exports = {
    singleQuote: true,
    useTabs: false,
    tabWidth: 4,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindConfig: './tailwind.config.ts',
};
