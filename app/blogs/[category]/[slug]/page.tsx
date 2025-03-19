import Navbar from "@/components/Navbar";
import { getBlogBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import CustomMDXComponents from "@/components/CustomMDXComponents";
import Image from "next/image";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import FooterSection from "@/components/FooterSection";

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export async function generateMetadata({ params }): Promise<Metadata> {
  const { category, slug } = params;
  const blog = await getBlogBySlug(category, slug);

  if (!blog) {
    return {
      title: "Blog Not Found!",
      description: "The requested blog could not be found.",
    };
  }

  const { meta } = blog;

  return {
    metadataBase: new URL("https://avizitrx.com"),
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image
        ? [`${process.env.NEXT_PUBLIC_BASE_URL}${meta.image}`]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.image
        ? [`${process.env.NEXT_PUBLIC_BASE_URL}${meta.image}`]
        : [],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: meta.title,
        author: {
          "@type": "Person",
          name: "Avizit Roy",
        },
        datePublished: meta.date,
        publisher: {
          "@type": "Person",
          name: "Avizit Roy | Web & Mobile App Developer",
          logo: {
            "@type": "ImageObject",
            url: "https://avizitrx.com/avizitRX_Logo.png",
          },
        },
      }),
    },
  };
}

async function ProjectContent({ category, slug }) {
  const blog = await getBlogBySlug(category, slug);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-center text-gray-400 text-lg">Blog not found!</p>
      </div>
    );
  }

  const { meta, content } = blog;

  return (
    <section className="pt-30 lg:px-0">
      <div className="container max-w-[90ch] mx-auto">
        {/* Title and Date */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {meta.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
          Published on {formatDate(meta.date)}
        </p>

        {/* Thumbnail with Caption */}
        {meta.image && (
          <figure className="mb-8">
            <Image
              src={meta.image}
              width={800}
              height={450}
              alt={meta.title}
              className="rounded-lg shadow-md"
              priority
            />
            {meta.caption && (
              <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
                {meta.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Content */}
        <div className="text-justify">
          <MDXRemote source={content} components={CustomMDXComponents} />
        </div>

        {/* Tags Section */}
        {meta.tags && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Tags:
            </h3>
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Page({
  params,
}: {
  params: { category: string; slug: string };
}) {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="container max-w-[90ch] mx-auto pt-30 lg:px-0">
            {/* Skeleton for Title */}
            <Skeleton className="w-3/4 h-10 mb-4" />
            {/* Skeleton for Date */}
            <Skeleton className="w-1/4 h-5 mb-6" />
            {/* Skeleton for Image */}
            <Skeleton className="w-full h-[450px] mb-8" />
            {/* Skeleton for Content */}
            <Skeleton className="w-full h-6 mb-2" />
            <Skeleton className="w-full h-6 mb-2" />
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-1/2 h-6 mb-2" />
            {/* Skeleton for Tags */}
            <div className="flex gap-2 mt-8">
              <Skeleton className="w-16 h-6 rounded-full" />
              <Skeleton className="w-20 h-6 rounded-full" />
              <Skeleton className="w-14 h-6 rounded-full" />
            </div>
          </div>
        }
      >
        <ProjectContent category={params.category} slug={params.slug} />
      </Suspense>
      <FooterSection />
    </>
  );
}
