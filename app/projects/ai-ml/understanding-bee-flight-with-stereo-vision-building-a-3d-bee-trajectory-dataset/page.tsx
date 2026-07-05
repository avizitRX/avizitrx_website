import TwoDPlot from "@/components/TwoDPlot";
import CustomImage from "@/components/CustomImage";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React, { Suspense } from "react";

const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// export async function metadata() {
//   return {
//     metadataBase: new URL("https://www.avizitrx.com"),
//     title:
//       "Understanding Bee Flight with Stereo Vision: Building a 3D Bee Trajectory Dataset",
//     description:
//       "This project presents a simple and low-cost approach for capturing and reconstructing the 3D flight trajectories of Asian honeybees",
//     openGraph: {
//       title:
//         "Understanding Bee Flight with Stereo Vision: Building a 3D Bee Trajectory Dataset",
//       description:
//         "This project presents a simple and low-cost approach for capturing and reconstructing the 3D flight trajectories of Asian honeybees",
//       images: [
//         `${process.env.NEXT_PUBLIC_HOST}/projects/understanding_bee_flight/Understanding_Bee_Flight _with_Stereo_Vision_Thumbnail.png`,
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title:
//         "Understanding Bee Flight with Stereo Vision: Building a 3D Bee Trajectory Dataset",
//       description:
//         "This project presents a simple and low-cost approach for capturing and reconstructing the 3D flight trajectories of Asian honeybees",
//       images: `${process.env.NEXT_PUBLIC_HOST}/projects/understanding_bee_flight/Understanding_Bee_Flight _with_Stereo_Vision_Thumbnail.png`,
//     },
//     other: {
//       "application/ld+json": JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "Article",
//         headline:
//           "Understanding Bee Flight with Stereo Vision: Building a 3D Bee Trajectory Dataset",
//         author: {
//           "@type": "Person",
//           name: "Avizit Roy",
//         },
//         datePublished: "05-07-2026",
//         publisher: {
//           "@type": "Person",
//           name: "Avizit Roy | Software Engineer",
//           logo: {
//             "@type": "ImageObject",
//             url: "https://www.avizitrx.com/avizitRX_Logo.png",
//           },
//         },
//       }),
//     },
//   };
// }

const Page: React.FC = () => {
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
        <section className="pt-30">
          <div className="container mx-auto max-w-[90ch] px-4 lg:px-0">
            {/* Title */}
            <section className="mb-10">
              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                Understanding Bee Flight with Stereo Vision: Building a 3D Bee
                Trajectory Dataset
              </h1>

              <p className="text-lg text-gray-500 dark:text-gray-400">
                Published on {formatDate("05/07/2026")}
              </p>
            </section>

            {/* Thumbnail with Caption */}
            <figure className="mb-8">
              <Image
                src="/projects/understanding_bee_flight/Understanding_Bee_Flight _with_Stereo_Vision_Thumbnail.png"
                width={800}
                height={450}
                alt="Understanding Bee Flight with Stereo Vision: Building a 3D Bee Trajectory Dataset"
                className="rounded-lg shadow-md"
                priority
              />
            </figure>

            {/* Project Team */}
            <section className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Project Team
              </h2>

              <p
                className="text-gray-700 dark:text-gray-300 my-5"
                style={{ fontSize: "1.1rem" }}
              >
                This project was carried out as a collaborative effort. I worked
                on the project together with <strong>Md. Ridoy Sarkar</strong>,{" "}
                <strong>Md. Shohidul Islam</strong>, under the supervision of{" "}
                <strong>Dr. Debajyoti Karmaker</strong>.
              </p>
            </section>

            {/* Article */}
            <article className="space-y-10">
              <section>
                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  Honeybees are fascinating insects that can fly quickly through
                  crowded environments without frequently colliding with one
                  another. They communicate, search for food and return to their
                  hive with remarkable accuracy. Studying how bees move can help
                  researchers better understand their behavior and also inspire
                  new technologies in robotics and autonomous navigation.
                </p>

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  This project presents a simple and low-cost approach for
                  capturing and reconstructing the three-dimensional (3D) flight
                  trajectories of Asian honeybees (<em>Apis cerana</em>).
                  Instead of using expensive scientific equipment, the system
                  uses two smartphone cameras placed side by side to record bee
                  movements near the entrance of a beehive. By combining
                  recordings from both cameras, it is possible to estimate the
                  position of each bee in 3D space and visualize its complete
                  flight path.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Collection
                </h2>

                <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>

                <CustomImage
                  src="/projects/ai-ml/understanding-bee-flight-with-stereo-vision-building-a-3d-bee-trajectory-dataset/Data_Collection.png"
                  alt="Camera Setup"
                  title="Camera Setup"
                />

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  The videos were collected in a natural environment at a
                  beekeeper&apos;s location in Jhinaigati, Sherpur, Bangladesh.
                  Two smartphones, an iPhone 15 and an iPhone 12, were mounted
                  10 cm apart and positioned 50 cm from the observation area. A
                  white cloth was placed behind the bees to improve their
                  visibility during recording. The cameras captured videos at a
                  resolution of 1920x1080 pixels and a frame rate of 60 frames
                  per second.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  Camera Calibration
                </h2>

                <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>

                <CustomImage
                  src="/projects/ai-ml/understanding-bee-flight-with-stereo-vision-building-a-3d-bee-trajectory-dataset/Camera_Calibration.png"
                  alt="Camera Calibration using Checkerboard"
                  title="Camera Calibration using Checkerboard"
                />

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  Before reconstructing the bee trajectories, the two cameras
                  had to be calibrated. Camera calibration is an important step
                  because each camera has slightly different properties, such as
                  lens distortion and viewing angle. A checkerboard pattern was
                  used for this purpose, allowing the intrinsic and extrinsic
                  parameters of both cameras to be estimated. These parameters
                  make it possible to accurately relate the images from the two
                  cameras and calculate the 3D position of objects.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  Annotation
                </h2>

                <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>

                <CustomImage
                  src="/projects/ai-ml/understanding-bee-flight-with-stereo-vision-building-a-3d-bee-trajectory-dataset/Annotation.png"
                  alt="A Annotated Frame"
                  title="A Annotated Frame"
                />

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  After recording, selected video frames were manually annotated
                  using the Computer Vision Annotation Tool (CVAT). Every
                  visible bee was enclosed with a bounding box and assigned a
                  unique identifier. The same identifier was maintained for the
                  corresponding bee in both camera views, ensuring that each bee
                  could be correctly matched across the stereo images. The
                  annotations were exported in the COCO format for further
                  processing.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  2D and 3D Trajectory Reconstruction
                </h2>

                <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  The annotated data was then processed using Python. First, the
                  center point of each bounding box was calculated to represent
                  the two-dimensional position of the bee in each frame. These
                  points were used to generate 2D trajectory visualizations for
                  both camera views. Different colors were assigned to different
                  bees, making it easier to observe their movement patterns over
                  time.
                </p>

                <TwoDPlot />
                <p
                  className="text-gray-700 dark:text-gray-300 my-5 text-center"
                  style={{ fontSize: "1.1rem" }}
                >Bees Position Frame by Frame</p>

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  To reconstruct the bees&apos; movements in 3D, stereo vision
                  techniques were applied. Using the calibrated camera
                  parameters and the corresponding 2D positions from both
                  cameras, OpenCV&apos;s Linear Triangulation method was used to
                  estimate the 3D coordinates of each bee. This process was
                  repeated for every frame, producing a continuous 3D flight
                  trajectory. The resulting trajectories were visualized using
                  Plotly, allowing users to explore the flight paths
                  interactively.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  Applications
                </h2>

                <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  This project demonstrates that accurate 3D bee trajectory
                  reconstruction can be achieved using affordable consumer
                  devices instead of specialized laboratory equipment. Such
                  datasets have potential applications in ethology, ecology,
                  computer vision, swarm robotics and bio-inspired navigation
                  systems. By understanding how bees move and avoid collisions,
                  researchers may develop more efficient algorithms for
                  autonomous drones and collaborative robotic systems.
                </p>
              </section>

              {/* <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Limitations
            </h2>

            <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>

            <p
              className="text-gray-700 dark:text-gray-300 my-5"
              style={{ fontSize: "1.1rem" }}
            >
              Although the approach is effective, it also has some limitations.
              Smartphone cameras have rolling shutter sensors, which may
              introduce distortion when recording fast-moving insects. In
              addition, software-based synchronization between the cameras may
              not be as precise as dedicated hardware synchronization. These
              factors can slightly reduce the accuracy of the reconstructed
              trajectories. Future work could improve the system by using
              higher-frame-rate cameras, automatic bee detection and tracking
              with deep learning, and additional camera viewpoints for more
              robust 3D reconstruction.
            </p>
          </section> */}

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  Conclusion
                </h2>

                <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>

                <p
                  className="text-gray-700 dark:text-gray-300 my-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  Overall, this project provides a practical demonstration of
                  how computer vision and stereo imaging can be used to study
                  honeybee flight in natural environments. It also offers a
                  valuable dataset that can support future research on insect
                  behavior and inspire new developments in intelligent robotic
                  systems.
                </p>
              </section>
            </article>
          </div>
        </section>
      </Suspense>
      <FooterSection />
    </>
  );
};

export default Page;
