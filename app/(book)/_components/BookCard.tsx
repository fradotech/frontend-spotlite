import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  writerName: string;
  coverUrl: string;
  pointPrice: number;
  tags: string[];
}

const BookCard: React.FC<CardProps> = ({
  title,
  writerName,
  coverUrl,
  pointPrice,
  tags,
}) => {
  return (
    <div className="group rounded-lg px-4 py-3 hover:dark:bg-gray-900 active:bg-gray-900 max-w-52 max-h-76">
      <Image
        src={coverUrl}
        alt={title}
        className="w-full h-48 object-cover mb-2 rounded"
        width={200}
        height={300}
      />
      <h2 className="mb-1 text-md md:text-lg font-semibold">{title}</h2>
      <p className="m-0 max-w-[20ch] text-xs opacity-50">{writerName}</p>
      <div className="mt-0.5 text-amber-600">
        <span className="font-bold text-lg">${pointPrice.toFixed(2)} USD</span>
      </div>
      <div className="flex flex-wrap mt-0.5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="m-0.5 bg-blue-900 rounded px-2 py-0.5 text-xs text-white rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
