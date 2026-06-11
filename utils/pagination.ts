import { Post } from "@/lib/types";

export function paginatePosts(posts: Post[], page: number, pageSize: number) {
  const total = posts.length;
  const totalPages = Math.ceil(total / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedPosts = posts.slice(start, end);

  return {
    posts: paginatedPosts,
    page,
    pageSize,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
