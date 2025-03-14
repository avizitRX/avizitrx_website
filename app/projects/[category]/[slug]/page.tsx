import Navbar from "@/components/Navbar";
import { getProjectBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import CustomMDXComponents from "@/components/CustomMDXComponents";
import Image from "next/image";
import { Metadata } from "next";

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day); // Create a Date object

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export async function generateMetadata({ params }): Promise<Metadata> {
  const { category, slug } = await params;
  const project = await getProjectBySlug(category, slug);

  if (!project) {
    return {
      title: "Project Not Found!",
      description: "The requested project could not be found.",
    };
  }

  const { meta } = project;

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
  };
}

export default async function Page({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { category, slug } = await params;
  const project = await getProjectBySlug(category, slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-center text-gray-400 text-lg">
            Project not found!
          </p>
        </div>
      </>
    );
  }

  const { meta, content } = project;

  return (
    <>
      <Navbar />

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
    </>
  );
}
