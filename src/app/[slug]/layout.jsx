import { fetchMetadata } from '../../components/blog/fetchMetadata';
import Script from 'next/script';
import { notFound } from 'next/navigation';

export default async function BlogLayout({ children, params }) {
    const { slug } = params;

    const post = await fetchMetadata(slug);

    // ⛔ Corte total si no pertenece a Hidroxiapatita
    if (!post) {
        notFound();
    }

    const title = post.title;
    const image = post.image ? [post.image] : ['https://blog.cientific.com.ar/default-image.jpg'];
    const datePublished = post.datePublished
        ? new Date(post.datePublished).toISOString()
        : null;
    const dateModified = post.dateModified
        ? new Date(post.dateModified).toISOString()
        : null;

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        image: image,
        datePublished: datePublished,
        dateModified: dateModified,
        author: {
            '@type': 'Person',
            name: 'Allanmar International Company SRL',
            url: 'https://blog.cientific.com.ar',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Cientific Blog',
            logo: {
                '@type': 'ImageObject',
                url: 'https://blog.cientific.com.ar/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://blog.cientific.com.ar/${slug}`,
        },
        url: `https://blog.cientific.com.ar/${slug}`,
    };

    return (
        <>
            <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(structuredData)}
            </Script>
            <div className="blog-layout">{children}</div>
        </>
    );
}
