import { client } from '../../../sanity/lib/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-static';

function ArrowLeftIcon(props) {
    return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
            <path
                d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
}

export default async function BlogPost({ params }) {
    const { slug } = params;

    const query = `*[
        _type == "post" &&
        slug.current == $slug &&
        "Hidroxiapatita" in categories[]->title
    ][0]{
        title,
        body,
        mainImage{
            asset->{
                url
            },
            alt,
            title
        },
        metaDescription,
        publishedAt
    }`;

    const post = await client.fetch(query, { slug });

    // ⛔ 404 real
    if (!post) {
        notFound();
    }

    return (
        <div className="mt-16 min-h-[100dvh]">
            <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                    <Link
                        href="/"
                        aria-label="Volver al blog"
                        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-900/5 transition"
                    >
                        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
                    </Link>

                    <article>
                        <header className="flex flex-col">
                            <time
                                dateTime={post.publishedAt}
                                className="order-first flex items-center text-base text-zinc-700"
                            >
                                <span className="h-4 w-0.5 rounded-full bg-zinc-700" />
                                <span className="ml-3">{formatDate(post.publishedAt)}</span>
                            </time>
                        </header>

                        <div className="w-full flex flex-col items-center">
                            <h1 className="font-bold text-4xl pb-4 text-center">
                                {post.title}
                            </h1>

                            {post.mainImage && (
                                <img
                                    src={post.mainImage.asset.url}
                                    alt={post.mainImage.alt || ''}
                                    title={post.mainImage.title || ''}
                                    className="md:w-1/2 self-center my-8"
                                />
                            )}

                            <div className="flex flex-col gap-5">
                                {post.body?.map((block, i) => {
                                    if (block._type === 'block') {
                                        const text = block.children.map((c) => c.text).join(' ');
                                        switch (block.style) {
                                            case 'h2':
                                                return <h2 key={i} className="text-2xl font-bold mt-10">{text}</h2>;
                                            case 'h3':
                                                return <h3 key={i} className="text-xl font-semibold mt-6">{text}</h3>;
                                            default:
                                                return <p key={i} className="leading-relaxed">{text}</p>;
                                        }
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
