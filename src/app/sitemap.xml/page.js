
import { useEffect } from 'react';

const EXTERNAL_DATA_URL = 'https://piratajuegos.com/api/posts';

async function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>https://jsonplaceholder.typicode.com</loc>
      </url>
      <url>
        <loc>https://jsonplaceholder.typicode.com/guide</loc>
      </url>
      ${posts
        .map(({ id }) => {
          return `
          <url>
            <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
          </url>
          `;
        })
        .join('')}
    </urlset>
  `;
}
async function getPosts (url) {
  const req = await fetch(url)
  const posts = await req.json()
  
  return posts
}

async function SiteMap() {

    const posts = await getPosts(EXTERNAL_DATA_URL)
    // Generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts);

    // Set the content type header to indicate XML
    document.contentType = 'text/xml';

    // Set the content of the page to the generated sitemap
    document.body.innerHTML = sitemap;


  // Return an empty component, as the content will be set in useEffect
  return null;
}

// export async function getServerSideProps({ res }) {
//   // Make an API call to gather the URLs for the site
//   const request = await fetch(EXTERNAL_DATA_URL);
//   const posts = await request.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

export default SiteMap;
