import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
        },
        fontSize: {
            xs: ['12px', '16px'],
            sm: ['14px', '20px'],
            base: ['16px', '22px'],
            lg: ['20px', '28px'],
            xl: ['24px', '32px'],
            '2xl': ['28px', '36px'],
            '3xl': ['36px', '42px'],
            '4xl': ['48px', '54px'],
            '5xl': ['54px', '64px'],
        },
    },
} satisfies Config;
