import { client } from '../../../sanity/lib/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchMetadata } from '../components/blog/fetchMetadata';

export const dynamic = 'force-static';

// ✅ NEXT USA ESTO AUTOMÁTICAMENTE
export async function generateMetadata({ params }) {
    const post = await fetchMetadata(params.slug);

    if (!post) {
        notFound();
    }

    const canonicalUrl = `https://blog.cientific.com.ar/${params.slug}`;

    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: canonicalUrl,
            type: 'article',
            images: post.image ? [{ url: post.image }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: post.image ? [post.image] : [],
        },
    };
}
