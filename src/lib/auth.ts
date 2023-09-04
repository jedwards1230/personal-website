import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
};
