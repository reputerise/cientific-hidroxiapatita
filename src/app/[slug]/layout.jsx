import { fetchMetadata } from '../../components/blog/fetchMetadata';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await fetchMetadata(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `https://blog.cientific.com.ar/${slug}`;

    return {
    title: post.title,
    description: post.description, // 👈 ESTA LÍNEA
    alternates: { canonical: canonicalUrl },
    openGraph: {
        title: post.title,
        description: post.description, // 👈 ESTA
        url: canonicalUrl,
        type: 'article',
        images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description, // 👈 Y ESTA
        images: post.image ? [post.image] : [],
    },
    };

}

export default async function BlogLayout({ children, params }) {
  const post = await fetchMetadata(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.image ? [post.image] : [],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Organization',
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
      '@id': `https://blog.cientific.com.ar/${params.slug}`,
    },
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <div className="blog-layout">{children}</div>
    </>
  );
}
