export default async function sitemap(req, res) {
  const site_URL = 'https://piratajuegos.com';
  const currentDate = new Date().toISOString();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts`);
    const posts = await response.json();

    // Crear las páginas del sitemap
    const pages = posts.map((post) => ({
      url: `${site_URL}/juegos/${post.post_title.replace(/ /g, "-").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    }));

    const staticPages = [
      {
        url: 'https://piratajuegos.com',
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 1,
      },
    ];

    const allPages = [...pages, ...staticPages];

    // Crear el XML
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified}</lastmod>
      <changefreq>${page.changeFrequency}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

    // Configurar el encabezado y enviar la respuesta
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemapXML);
  } catch (error) {
    console.error('Error al obtener datos: ', error);
    res.status(500).send('Error al generar el sitemap');
  }
}
