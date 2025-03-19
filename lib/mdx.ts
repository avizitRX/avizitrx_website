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
  return new Date(year, month - 1, day); // Month is 0-based in JS
};

// Helper function to recursively read all MDX files from nested directories
async function getAllFiles(
  directory: string,
  rootDir: string,
  category = ""
): Promise<Post[]> {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  let posts: Post[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    const subCategory = category ? `${category}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Recursively fetch posts from subdirectories
      const subPosts = await getAllFiles(fullPath, rootDir, subCategory);
      posts = [...posts, ...subPosts];
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      // Process MDX file
      const fileContent = await fs.promises.readFile(fullPath, "utf-8");
      const { data } = matter(fileContent);

      posts.push({
        ...(data as Post),
        slug: entry.name.replace(".mdx", ""),
        category: path.relative(rootDir, directory), // Ensure correct category path
      });
    }
  }

  return posts.sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );
}

// Get all projects (from subdirectories)
export async function getAllProjects(): Promise<Post[]> {
  return await getAllFiles(projectsRoot, projectsRoot);
}

// Get all blogs (from subdirectories)
export async function getAllBlogs(): Promise<Post[]> {
  return await getAllFiles(blogsRoot, blogsRoot);
}

// Get a single post by slug and category
export const getPostBySlug = async (
  rootDir: string,
  category: string,
  slug: string
) => {
  const filePath = path.join(rootDir, category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  const { title, description, date, image, tags } = frontmatter;

  return {
    meta: { title, description, date, image, tags, slug, category },
    content,
  };
};

// Get metadata for all posts in a directory (recursively)
export const getPostsMetaData = async (rootDir: string) => {
  const posts = await getAllFiles(rootDir, rootDir);
  return posts.map(({ slug, title, date, category }) => ({
    slug,
    title,
    date,
    category,
  }));
};

// Fetch a project by slug and category
export async function getProjectBySlug(category: string, slug: string) {
  return await getPostBySlug(projectsRoot, category, slug);
}

// Fetch a blog by slug and category
export async function getBlogBySlug(category: string, slug: string) {
  return await getPostBySlug(blogsRoot, category, slug);
}

// Fetch all project metadata
export async function getProjectMetadata() {
  return await getPostsMetaData(projectsRoot);
}

// Fetch all blog metadata
export async function getBlogMetadata() {
  return await getPostsMetaData(blogsRoot);
}
