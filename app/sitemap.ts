import { MetadataRoute } from "next";
import { getProjectMetadata } from "@/lib/mdx";

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_HOST;

  const projects = await getProjectMetadata();
  //   const blogs = await getBlogMetadata();

  //   const blogUrls = blogs.map((blog) => ({
  //     url: `${baseUrl}/blogs/${blog.category}/${blog.slug}`,
  //     lastModified: new Date(blog.date).toISOString(),
  //   }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}projects/${project.category}/${project.slug}`,
    lastModified: parseDate(project.date).toISOString(),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
    },
    ...projectUrls,
    // ...blogUrls,
  ];
}
