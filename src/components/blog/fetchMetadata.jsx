import { client } from '../../../sanity/lib/client';

export async function fetchMetadata(slug) {
    const query = `*[
        _type == "post" &&
        slug.current == $slug &&
        "Hidroxiapatita" in categories[]->title
    ][0]{
        title,
        metaDescription,
        mainImage{
            asset->{
                url
            }
        }
    }`;

    const post = await client.fetch(query, { slug });

    if (!post) {
        return null;
    }

    return {
        title: post.title,
        description: post.metaDescription,
        image: post.mainImage?.asset?.url || null,
    };
}
