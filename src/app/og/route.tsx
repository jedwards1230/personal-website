import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    return new ImageResponse(
        (
            <div tw="flex flex-col w-full bg-white h-full justify-center pb-16 pl-8">
                <div tw="text-7xl font-semibold pb-2">Justin Edwards</div>
                <div tw="text-4xl font-semibold tracking-wide text-neutral-500 pl-2">
                    Full Stack Developer
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    );
}
