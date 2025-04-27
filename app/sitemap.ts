import { MetadataRoute } from "next";
import { getProjectMetadata } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  //   const blogs = await getBlogMetadata();
  const projects = await getProjectMetadata();

  //   const blogUrls = blogs.map((blog) => ({
  //     url: `${baseUrl}/blogs/${blog.category}/${blog.slug}`,
  //     lastModified: new Date(blog.date).toISOString(),
  //   }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.category}/${project.slug}`,
    // lastModified: new Date(project.date).toISOString(),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
    },
    // ...blogUrls,
    ...projectUrls,
  ];
}
