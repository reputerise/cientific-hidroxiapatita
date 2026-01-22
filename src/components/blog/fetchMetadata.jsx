import { client } from "../../../sanity/lib/client";

export async function fetchMetadata(slug) {
  const query = `*[_type == "post" && "Hidroxiapatita" in categories[]->title && slug.current == $slug][0]{
    title,
    metaDescription, 
   mainImage{
      asset->{url}
    },
    publishedAt,
    _updatedAt, 
    abstract
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) return null;

  return {
    title: post.title,
    description: post.abstract,
    image: post.mainImage?.asset?.url || null,
    datePublished: post.publishedAt || null,
    dateModified: post._updatedAt || null,
  };
}
