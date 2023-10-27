
const EXTERNAL_DATA_URL = 'https://piratajuegos.com/api/posts';
const SITE_URL = 'https://piratajuegos.com'; // Asegúrate de ajustar la URL de tu sitio web


async function generateSiteMap(posts) {
  const sitemapEntries = posts.map(({ title, date }) => ({
    url: `https://piratajuegos.com/posts/${title}`, // Ajusta la URL de tus posts
    lastModified: date,
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- We manually set the two URLs we know already -->
      <url>
        <loc>https://piratajuegos.com</loc>
      </url>
      <url>
        <loc>https://piratajuegos.com/guide</loc>
      </url>
      ${sitemapEntries
        .map(({ url, lastModified }) => {
          return `
          <url>
            <loc>${url}</loc>
            <lastmod>${lastModified}</lastmod>
          </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  return sitemap;
}

export async function serverAction() {
  try {
    const response = await fetch(EXTERNAL_DATA_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const posts = await response.json();

    const sitemap = generateSiteMap(posts);

    return {
      headers: {
        'Content-Type': 'text/xml',
      },
      body: sitemap,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: 'Internal Server Error',
    };
  }
}
export default function SiteMap() {
  return null; // No necesitas un componente visible, ya que se generará el sitemap directamente en el servidor
}

