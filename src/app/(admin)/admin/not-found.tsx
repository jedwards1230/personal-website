import { LogoutButton } from '@/components/buttons/LogoutButton';

export default function NotFound() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
            <div className="text-xl font-medium">User not authorized</div>
            <div className="flex flex-col">
                <LogoutButton>Return Home</LogoutButton>
                <p className="text-sm">(Will revoke auth session)</p>
            </div>
        </div>
    );
}
