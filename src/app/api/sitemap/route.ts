import { getAllPostPathStrings } from '@/libraries/post';

const url = 'https://jiwony.dev'

export function GET() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  const allPostPaths = getAllPostPathStrings();

  const postsSitemap = allPostPaths.map((pathname) => {
    return `
      <url>
        <loc>${url}/posts/${pathname}</loc>
        <lastmod>${year}-${month}-${day}</lastmod>
      </url>
    `;
  }).toString().replaceAll(",", "");

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${postsSitemap}
        </urlset>
    `.trim();

  return new Response(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  })
}