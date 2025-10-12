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
      'https://c38gqpt0.api.sanity.io/v1/data/query/production?query=*[_type == "post"]{title, slug, categories[]->{title}}'
    );
  
    const posts = await res.json();
  
    console.log("✅ Posts completos:", posts.result);
  
    // Filtramos por categoría que contenga 'Hidroxiapatita'
    const filteredPosts = posts.result.filter(post =>
      post.categories?.some(cat => cat.title === "Hidroxiapatita")
    );
  
    console.log("🧩 Posts filtrados por Hidroxiapatita:", filteredPosts);
  
    // Mapeamos a rutas
    const routes = filteredPosts.map(post => ({
      loc: `/${post.slug.current}`,
      lastmod: new Date().toISOString(),
    }));
  
    console.log("🌐 Rutas generadas:", routes);
    return routes;
  }
  
  