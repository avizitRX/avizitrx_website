import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";

const projectsRoot = path.join(process.cwd(), "content/projects");
const blogsRoot = path.join(process.cwd(), "content/blogs");

const parseDate = (dateStr?: string): Date => {
  if (!dateStr) return new Date(0);
  const parts = dateStr.split("/").map(Number);
  if (parts.length !== 3) return new Date(0);
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
};

type PostType = "blog" | "project";

interface PaginatedResult {
  posts: Post[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

async function collectPosts(
  directory: string,
  type: PostType,
  category = "",
): Promise<Post[]> {
  const entries = await fs.promises.readdir(directory, { withFileTypes: true });

  let posts: Post[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const nextCategory = category ? `${category}/${entry.name}` : entry.name;
      const subPosts = await collectPosts(fullPath, type, nextCategory);
      posts.push(...subPosts);
      continue;
    }

    if (!entry.name.endsWith(".mdx")) continue;

    const source = await fs.promises.readFile(fullPath, "utf-8");
    const { data } = matter(source);

    if (!data.date || !data.title) continue; // Skip invalid posts

    posts.push({
      ...(data as Post),
      slug: entry.name.replace(".mdx", ""),
      category,
      type,
    });
  }

  return posts;
}

async function getPaginatedPosts(
  rootDir: string,
  type: PostType,
  page = 1,
  pageSize = 6,
): Promise<PaginatedResult> {
  const posts = await collectPosts(rootDir, type);

  // Sort safely
  posts.sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );

  const total = posts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    posts: posts.slice(start, end),
    total,
    totalPages,
    page,
    pageSize,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// Public functions
export async function getProjects(page = 1, pageSize = 6) {
  return getPaginatedPosts(projectsRoot, "project", page, pageSize);
}

// lib/mdx.ts
export async function getBlogs(page = 1, pageSize = 6) {
  const allPosts = await collectPosts(blogsRoot, "blog");

  // sort by date descending
  allPosts.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  const total = allPosts.length;
  const totalPages = Math.ceil(total / pageSize);

  // clamp page number
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const posts = allPosts.slice(start, end);

  return {
    posts,
    total,
    totalPages,
    page: currentPage,
    pageSize,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

export async function getPostBySlug(
  rootDir: string,
  category: string,
  slug: string,
) {
  const filePath = path.join(rootDir, category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const source = await fs.promises.readFile(filePath, "utf-8");
  const { data: frontmatter, content } = matter(source);

  // Explicitly define the meta object as a Post type
  const meta: Post = {
    title: frontmatter.title || "",
    description: frontmatter.description || "",
    date: frontmatter.date || "",
    tags: frontmatter.tags || [],
    image: frontmatter.image || "",
    slug: slug,
    category: category,
    type: rootDir === blogsRoot ? "blog" : "project",
  };

  return {
    meta,
    content,
  };
}

export async function getProjectBySlug(category: string, slug: string) {
  return getPostBySlug(projectsRoot, category, slug);
}

export async function getBlogBySlug(category: string, slug: string) {
  return getPostBySlug(blogsRoot, category, slug);
}




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

export async function getProjectMetadata() {
  return getPostsMetaData(projectsRoot, "project");
}

export async function getBlogMetadata() {
  return getPostsMetaData(blogsRoot, "blog");
}
