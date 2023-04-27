import type { Config } from 'tailwindcss';

export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
        },
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config;
