import Navbar from "@/components/Navbar";
import { getProjectBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import CustomMDXComponents from "@/components/CustomMDXComponents";
import Image from "next/image";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

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

async function TitleSection({ category, slug }) {
  const project = await getProjectBySlug(category, slug);
  if (!project)
    return <p className="text-gray-400 text-lg">Project not found!</p>;

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {project.meta.title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
        Published on {formatDate(project.meta.date)}
      </p>
    </>
  );
}

async function ThumbnailSection({ category, slug }) {
  const project = await getProjectBySlug(category, slug);
  if (!project || !project.meta.image) return null;

  return (
    <figure className="mb-8">
      <Image
        src={project.meta.image}
        width={800}
        height={450}
        alt={project.meta.title}
        className="rounded-lg shadow-md"
        priority
      />
      {project.meta.caption && (
        <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          {project.meta.caption}
        </figcaption>
      )}
    </figure>
  );
}

async function ContentSection({ category, slug }) {
  const project = await getProjectBySlug(category, slug);
  if (!project) return null;

  return (
    <div className="text-justify">
      <MDXRemote source={project.content} components={CustomMDXComponents} />
    </div>
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
      <section className="pt-30 lg:px-0">
        <div className="container max-w-[90ch] mx-auto">
          {/* Title Section */}
          <Suspense
            fallback={
              <>
                <Skeleton className="w-3/4 h-10 mb-4" />
                <Skeleton className="w-1/4 h-5 mb-6" />
              </>
            }
          >
            <TitleSection category={params.category} slug={params.slug} />
          </Suspense>

          {/* Thumbnail Section */}
          <Suspense fallback={<Skeleton className="w-full h-[450px] mb-8" />}>
            <ThumbnailSection category={params.category} slug={params.slug} />
          </Suspense>

          {/* Content Section */}
          <Suspense
            fallback={
              <>
                <Skeleton className="w-full h-6 mb-2" />
                <Skeleton className="w-full h-6 mb-2" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-6 mb-2" />
              </>
            }
          >
            <ContentSection category={params.category} slug={params.slug} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
