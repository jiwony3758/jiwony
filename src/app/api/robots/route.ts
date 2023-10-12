import metadata from "../../../../config/metadata";

const siteUrl = metadata.metadataBase;

export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /api
Sitemap: ${siteUrl}sitemap.xml
  `,
    {
      status: 200,
    }
  );
}
