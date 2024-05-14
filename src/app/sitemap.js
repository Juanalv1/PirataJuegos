
export default async function sitemap() {
  const site_URL = 'https://piratajuegos.com';
  const currentDate = new Date();

  try {
    const req = await fetch(`http://localhost:3000/api/v1/posts`);
    const posts = await req.json();

      // Resto del código para crear las páginas del sitemap
      const pages = posts.map((post) => (
        {
        url: `${site_URL}/juegos/${post.post_title.replace(/ /g, "-")}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 1,
      }));
      
      const staticPages = [
        {
          url: 'https://piratajuegos.com',
          lastModified: currentDate,
          changeFrequency: 'daily',
          priority: 1,
        },
      ];

      const allPages = [...pages, ...staticPages];

      return allPages;
  } catch (error) {
    console.error('Error al obtener datos: ', error);
    return [];
  }
}