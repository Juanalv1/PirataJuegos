export default async function sitemap() {
  const fetchURL = 'http://piratajuegos.com/api/posts';
  const site_URL = 'http://piratajuegos.com';
  const currentDate = new Date();

  try {
    const req = await fetch(fetchURL);
    const posts = await req.json();
    const titulo = posts.post_title
    console.log(titulo)

      // Resto del código para crear las páginas del sitemap
      const pages = posts.map((post) => ({
        url: `${site_URL}/juegos/${post.title}`,
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
    return [];
  }
}