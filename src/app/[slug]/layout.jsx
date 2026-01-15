import { fetchMetadata } from '../../components/blog/fetchMetadata';
import Script from "next/script";

export async function generateMetadata({ params }) {
    const postMetadata = await fetchMetadata(params.slug);
    const canonicalUrl = `https://blog.cientific.com.ar/${params.slug}`;

    return {
        title: postMetadata.title,
        description: postMetadata.description,
        openGraph: {
            title: postMetadata.title,
            description: postMetadata.description,
            url: `https://blog.cientific.com.ar/${params.slug}`,
            images: [{ url: postMetadata.image }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: postMetadata.title,
            description: postMetadata.description,
            images: [postMetadata.image],
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function BlogLayout({ children, params }) {
    const { slug } = params;

    // 🔥 Traemos los datos desde Sanity
    const post = await fetchMetadata(slug);

    // 🔄 Aseguramos valores por defecto si no hay datos
    const title = post?.title || "Título no disponible";
    const image = post?.image ? [post.image] : ["https://blog.cientific.com.ar/default-image.jpg"];
    const datePublished = post?.datePublished ? new Date(post.datePublished).toISOString() : null;
    const dateModified = post?.dateModified ? new Date(post.dateModified).toISOString() : null;

    // 🔍 JSON-LD (datos estructurados)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "image": image,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
            "@type": "Person",
            "name": "Allanmar International Company SRL",
            "url": "https://blog.cientific.com.ar"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Cientific Blog",
            "logo": {
                "@type": "ImageObject",
                "url": "https://blog.cientific.com.ar/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://blog.cientific.com.ar/${slug}`
        },
        "url": `https://blog.cientific.com.ar/${slug}`
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
