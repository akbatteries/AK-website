import type { MetadataRoute } from "next";

export const revalidate = 3600; // Revalidate sitemap every hour

// Product-detail pages (/product/[id]) are intentionally excluded from the
// sitemap so they do not appear in Google Search results. They remain
// accessible to website visitors via direct links and internal navigation.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akbatteries.in";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/batteries-inverters`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/water-purifier`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
