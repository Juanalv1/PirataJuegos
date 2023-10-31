export default async function sitemap() {
  const fetchURL = 'http://piratajuegos.com/api/posts';
  const site_URL = 'http://piratajuegos.com'
  const currentDate = new Date();
  const req = await fetch(fetchURL)
  const posts = await req.json()
  const titulo = posts.post_title.replace(/ /g, "-");
  // Crear un array de objetos que representan las páginas/posts
  const pages = posts.map((post) => ({
    url: `${site_URL}/juegos/${titulo}`, // Codifica el título
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
    },]

    const allPages = [...pages, ...staticPages];

    return allPages;
}
