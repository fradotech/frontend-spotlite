import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  writerName: string;
  coverUrl: string;
  pointPrice: number;
  tags: string[];
}

const Card: React.FC<CardProps> = ({
  title,
  writerName,
  coverUrl,
  pointPrice,
  tags,
}) => {
  return (
    <div className="group rounded-lg border border-transparent bg-black px-5 py-4 transition-colors hover:dark:border-gray-700 hover:dark:bg-gray-900">
      <Image
        src={coverUrl}
        alt={title}
        className="w-full h-64 object-cover mb-4 rounded"
        width={300}
        height={400}
      />
      <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{writerName}</p>
      <div className="mt-2 text-red-800">
        <span className="font-bold">${pointPrice.toFixed(2)} USD</span>
      </div>{" "}
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="m-1 bg-blue-900 rounded-5 px-2 py-1 text-sm font-semibold text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
