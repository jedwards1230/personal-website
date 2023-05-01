import { getEmbedding } from '@/lib/gpt';
import supabase from '@/lib/supabase';

async function fetchGitHubContent(
    owner: string,
    repo: string,
    path: string = ''
) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    );
    const data = await response.json();
    return data;
}

async function getData(owner: string, repo: string, paths: string[]) {
    try {
        // Fetch README.md content
        const readmeData = await fetchGitHubContent(owner, repo, 'README.md');

        // convert from base64 to utf-8
        const readmeContent = atob(readmeData.content);

        // Fetch specified subfolders
        const subfoldersData = await Promise.all(
            paths.map((path) => fetchGitHubContent(owner, repo, path))
        );

        // Combine the data and return the result
        const result = {
            readme: readmeContent,
            subfolders: subfoldersData,
        };

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function storeEmbedding(title: string, body: string) {
    // Generate a vector using OpenAI
    const embedding = await getEmbedding(title + '\n\n' + body);

    // Store the vector in Postgres
    const { data, error } = await supabase.from('embeddings').upsert(
        {
            title,
            body,
            embedding,
        },
        {
            onConflict: 'title',
        }
    );

    if (error) {
        throw error;
    }

    return data;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const paths = searchParams.get('paths')?.split(',') || [];

    try {
        const result = await getData(owner, repo, paths);
        await storeEmbedding(
            `github/${owner}/${repo}/README.md`,
            result.readme
        );
        /* result.subfolders.forEach((subfolder: any) => {
            subfolder.forEach((file: any) => {
                if (file.name === 'README.md') {
                    storeEmbedding(file.path, atob(file.content));
                }
            });
        }); */

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'An error occurred while fetching the data',
                error,
            }),
            {
                status: 500,
                headers: { 'content-type': 'application/json' },
            }
        );
    }
}
