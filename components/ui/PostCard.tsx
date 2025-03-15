import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  image?: string;
  slug: string;
}

// Function to format the date
const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const PostCard = ({
  title,
  description,
  category,
  date,
  image,
  slug,
}: PostCardProps) => {
  return (
    <Link href={`/blogs/${category}/${slug}`} className="block">
      <div className="flex bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition hover:shadow-xl h-[220px]">
        {/* Thumbnail on the Left (Fixed Size) */}
        <div className="w-1/3 h-full">
          <Image
            src={image ?? "/Avizit_Roy.png"}
            alt={title}
            width={300}
            height={220}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Details on the Right */}
        <div className="w-2/3 p-5 flex flex-col">
          {/* Category and Date */}
          <div className="text-xs text-gray-600 dark:text-gray-400 flex justify-between gap-3">
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
              {category}
            </span>
            <span>{formatDate(date)}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl py-3 font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 text-md line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
