import { getBlogs } from "@/lib/mdx";
import PostCard from "@/components/ui/PostCard";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageQuery } = await searchParams;

  // Convert string query to number, default to 1
  const page = parseInt(pageQuery || "1", 10) || 1;
  const pageSize = 10;

  const {
    posts,
    totalPages,
    page: currentPage,
  } = await getBlogs(page, pageSize);

  if (!posts || posts.length === 0) {
    return <p className="text-center mt-10">No blogs found!</p>;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <Navbar />

      <section className="container mx-auto py-28">
        <h1 className="text-center mb-10">
          <BlurFade delay={0.25} inView>
            <AuroraText className="text-6xl">Blogs</AuroraText>
          </BlurFade>
        </h1>

        <BlurFade delay={0.5} inView>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-16">
            {/* Previous Button */}
            <Link
              href={`/blogs?page=${currentPage - 1}`}
              className={`flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-all hover:border-neutral-600 hover:text-white ${
                currentPage <= 1 ? "pointer-events-none opacity-30" : ""
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-2 bg-neutral-900/30 p-1 rounded-2xl border border-neutral-800/50">
              {pageNumbers.map((num) => {
                const isActive = num === currentPage;
                return (
                  <Link
                    key={num}
                    href={`/blogs?page=${num}`}
                    className={`relative flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        : "text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200"
                    }`}
                  >
                    {num}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            <Link
              href={`/blogs?page=${currentPage + 1}`}
              className={`flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-all hover:border-neutral-600 hover:text-white ${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-30"
                  : ""
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </Link>
          </div>
        </BlurFade>
      </section>

      <FooterSection />
    </>
  );
}
