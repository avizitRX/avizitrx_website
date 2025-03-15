import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Bryce",
    body: "This freelancer was fast and helped get our emails working again thanks again!",
    img: "/testimonial-avatar/jack.png",
  },
  {
    name: "Abdal",
    body: "We always come back to him whenever there's an issue; that's how good he is.",
    img: "/testimonial-avatar/jill.png",
  },
  {
    name: "Francis",
    body: "Great knowledge and expertise",
    img: "/testimonial-avatar/jane.png",
  },
  {
    name: "Jenny",
    body: "Avizit Roy is one of the best experts I have worked with. great communication skill fast response and delivery.",
    img: "/testimonial-avatar/jenny.png",
  },
  {
    name: "Abdal",
    body: "The issue was solved very quickly and was understandable, clear, and patient throughout the process. Overall, it was a fantastic experience!",
    img: "/testimonial-avatar/john.png",
  },
  {
    name: "Prasenjit",
    body: "Avizit is very skillful and my first choice for website and mobile development.",
    img: "/testimonial-avatar/james.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username?: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt="Testimonial avatar"
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function TestimonialSection() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
