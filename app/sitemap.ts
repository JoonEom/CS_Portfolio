import type { MetadataRoute } from "next";

const siteUrl = "https://minjooneom.us";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/experience", "/projects", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
