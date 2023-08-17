import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://jedwards.cc',
            lastModified: new Date(),
        },
    ];
}
