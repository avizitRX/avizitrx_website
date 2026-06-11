import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";

// Define root directories
const projectsRoot = path.join(process.cwd(), "content/projects");
const blogsRoot = path.join(process.cwd(), "content/blogs");

// Helper function to parse date from "dd/mm/yyyy" format
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

// Helper function to recursively read all MDX files
async function getAllFiles(
  directory: string,
  rootDir: string,
  type: "blog" | "project",
  category = "",
): Promise<Post[]> {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  let posts: Post[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const subCategory = category ? `${category}/${entry.name}` : entry.name;

      const subPosts = await getAllFiles(fullPath, rootDir, type, subCategory);

      posts.push(...subPosts);
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const fileContent = await fs.promises.readFile(fullPath, "utf-8");
      const { data } = matter(fileContent);

      posts.push({
        ...(data as Post),
        slug: entry.name.replace(".mdx", ""),
        category,
        type,
      });
    }
  }

  return posts.sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );
}

// Get all projects
export async function getAllProjects(): Promise<Post[]> {
  return getAllFiles(projectsRoot, projectsRoot, "project");
}

// Get all blogs
export async function getAllBlogs(): Promise<Post[]> {
  return getAllFiles(blogsRoot, blogsRoot, "blog");
}

// Get a single post by slug and category
export const getPostBySlug = async (
  rootDir: string,
  category: string,
  slug: string,
) => {
  const filePath = path.join(rootDir, category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = await fs.promises.readFile(filePath, "utf-8");

  const { data: frontmatter, content } = matter(fileContent);

  const { title, description, date, image, tags } = frontmatter;

  return {
    meta: {
      title,
      description,
      date,
      image,
      tags,
      slug,
      category,
    },
    content,
  };
};

// Get metadata
export const getPostsMetaData = async (
  rootDir: string,
  type: "blog" | "project",
) => {
  const posts = await getAllFiles(rootDir, rootDir, type);

  return posts.map(({ slug, title, date, category, type }) => ({
    slug,
    title,
    date,
    category,
    type,
  }));
};

// Project helpers
export async function getProjectBySlug(category: string, slug: string) {
  return getPostBySlug(projectsRoot, category, slug);
}

export async function getProjectMetadata() {
  return getPostsMetaData(projectsRoot, "project");
}

// Blog helpers
export async function getBlogBySlug(category: string, slug: string) {
  return getPostBySlug(blogsRoot, category, slug);
}

export async function getBlogMetadata() {
  return getPostsMetaData(blogsRoot, "blog");
}
