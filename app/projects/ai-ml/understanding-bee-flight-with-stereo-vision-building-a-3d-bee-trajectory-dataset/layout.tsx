import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const host = process.env.NEXT_PUBLIC_HOST || "https://www.avizitrx.com";
  const thumbnailUrl = `${host}/projects/ai-ml/understanding-bee-flight-with-stereo-vision-building-a-3d-bee-trajectory-dataset/Understanding_Bee_Flight_with_Stereo_Vision_Thumbnail.png`;
  const title =
    "Understanding Bee Flight with Stereo Vision: Building a 3D Bee Trajectory Dataset";
  const description =
    "This project presents a simple and low-cost approach for capturing and reconstructing the 3D flight trajectories of Asian honeybees";

  return {
    metadataBase: new URL("https://www.avizitrx.com"),
    title,
    description,
    openGraph: { title, description, images: [thumbnailUrl] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnailUrl],
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
