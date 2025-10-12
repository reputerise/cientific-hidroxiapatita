/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://blog.cientific.com.ar/',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    outDir: './public',
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }],
    },
    additionalPaths: async () => {
      const dynamicRoutes = await fetchDynamicRoutes();
      return dynamicRoutes;
    },
  };
  
  async function fetchDynamicRoutes() {
    const res = await fetch(
        'https://c38gqpt0.api.sanity.io/v1/data/query/production?query=*[_type == "post" && category == "Hidroxiapatita"]{slug}'
    );
    const posts = await res.json();
    return posts.result.map(post => ({
      loc: `/${post.slug.current}`,
      lastmod: new Date().toISOString(),
    }));
  }
  