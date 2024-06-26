export const revalidate = 3600;

export default async function sitemap() {
  const site_URL = 'https://piratajuegos.com';
  const currentDate = new Date().toISOString();

  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts`, {next: {
      revalidate: 3600
    }});
    const posts = await req.json();

    const escapeXml = (unsafe) => {
      return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '"': return '&quot;';
          case '\'': return '&apos;';
        }
      });
    };

    const pages = posts.map((post) => ({
      url: `${site_URL}/juegos/${escapeXml(post.post_title.replace(/ /g, "-"))}`,
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

    return allPages;
  } catch (error) {
    console.error('Error al obtener datos: ', error);
    return '';
  }
}