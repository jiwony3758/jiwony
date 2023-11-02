import { PostVM } from "@/vm/Post";
import metadata from "../../../../config/metadata";
import di from "@/di";

const siteUrl = metadata.metadataBase;

export async function GET() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const postsProperties = await di.post.getPostsProperties();

  const postsSitemap = postsProperties
    .map((postProperties) => {
      const postSitemapPath = PostVM.propertiesToSitemapPath(postProperties);
      if (postProperties.visible === "true") {
        return `
          <url>
            <loc>${siteUrl}${postSitemapPath}</loc>
            <lastmod>${year}-${month}-${day}</lastmod>
          </url>
        `;
      }
    })
    .toString()
    .replaceAll(",", "");

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${postsSitemap}
        </urlset>
    `.trim();

  return new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
