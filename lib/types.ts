export interface Post {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  slug: string;
  content?: string;
  type: "blog" | "project";
}

export interface BlogProps {
  blogs: Post[];
  currentPage: number;
  totalPages: number;
}

export interface ProjectProps {
  projects: Post[];
}
