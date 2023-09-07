import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
            <div className="text-xl font-medium">Page Not Found</div>
            <Link href="/">Return Home</Link>
        </div>
    );
}
