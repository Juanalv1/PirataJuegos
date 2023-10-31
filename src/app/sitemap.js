export default async function sitemap() {
  const fetchURL = 'http://piratajuegos.com/api/posts';
  const site_URL = 'http://piratajuegos.com';
  const currentDate = new Date();

  try {
    const req = await fetch(fetchURL);
    const data = await req.json();

    if (data && data.post_title) {
      const titulo = data.post_title.replace(/ /g, "-");

      // Resto del código para crear las páginas del sitemap

      const pages = posts.map((post) => ({
        url: `${site_URL}/juegos/${titulo}`,
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
    } else {
      console.error('La propiedad "post_title" no existe en los datos.');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener datos: ', error);
    return [];
  }
}