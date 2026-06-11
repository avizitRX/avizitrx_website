import { MetadataRoute } from "next";
import { getBlogMetadata, getProjectMetadata } from "@/lib/mdx";

// Helper to handle DD/MM/YYYY format safely
const parseDate = (dateStr: string): string => {
  try {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    // Ensure the date is valid, otherwise return current date
    return isNaN(date.getTime())
      ? new Date().toISOString()
      : date.toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ensure baseUrl doesn't have a trailing slash for consistent joining
  const baseUrl = (
    process.env.NEXT_PUBLIC_HOST || "https://www.avizitrx.com"
  ).replace(/\/$/, "");

  const [projects, blogs] = await Promise.all([
    getProjectMetadata(),
    getBlogMetadata(),
  ]);

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.category}/${blog.slug}`,
    lastModified: parseDate(blog.date),
  }));

  const projectUrls = projects.map((project) => ({
    // Added missing "/" before projects
    url: `${baseUrl}/projects/${project.category}/${project.slug}`,
    lastModified: parseDate(project.date),
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
