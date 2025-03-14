import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";

// Define directories for projects and blogs
const projectsDirectory = path.join(process.cwd(), "content/projects");
const blogDirectory = path.join(process.cwd(), "content/blog");

// Helper function to read all posts from a directory
async function getAllFiles(directory: string): Promise<Post[]> {
  const files = fs.readdirSync(directory);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx")) // Only process .mdx files
      .map(async (filename) => {
        const filePath = path.join(directory, filename);
        const fileContent = await fs.promises.readFile(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
          ...(data as Post),
          slug: filename.replace(".mdx", ""),
        };
      })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get all projects
export async function getAllProjects(): Promise<Post[]> {
  return await getAllFiles(projectsDirectory);
}

// Get all blog posts
export async function getAllBlogs(): Promise<Post[]> {
  return await getAllFiles(blogDirectory);
}

// Get a single post by slug
export const getPostBySlug = async (directory: string, slug: string) => {
  const filePath = path.join(directory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null; // Handle missing file

  const fileContent = await fs.promises.readFile(filePath, "utf-8");

  // Parse frontmatter and MDX content
  const { data: frontmatter, content } = matter(fileContent);

  return { meta: { ...frontmatter, slug }, content };
};

// Get metadata for all posts in a directory
export const getPostsMetaData = async (directory: string) => {
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(".mdx", "");
      const post = await getPostBySlug(directory, slug);
      return post ? post.meta : null;
    })
  );

  return posts.filter(Boolean); // Remove null values
};

// Fetch a project by slug
export async function getProjectBySlug(slug: string) {
  return await getPostBySlug(projectsDirectory, slug);
}

// Fetch a blog by slug
export async function getBlogBySlug(slug: string) {
  return await getPostBySlug(blogDirectory, slug);
}

// Fetch all project metadata
export async function getProjectMetadata() {
  return await getPostsMetaData(projectsDirectory);
}

// Fetch all blog metadata
export async function getBlogMetadata() {
  return await getPostsMetaData(blogDirectory);
}
