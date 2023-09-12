import { getServerSession, type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { redirect, notFound } from 'next/navigation';

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
export async function getSession(redirectToSignIn: boolean = true) {
    const session = await getServerSession(authOptions);

    if (!session) {
        if (redirectToSignIn) redirect('/api/auth/signin');
        return null;
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
        notFound();
    }

    return session;
}
