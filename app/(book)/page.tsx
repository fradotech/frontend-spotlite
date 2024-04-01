"use client";

import { TBook } from "./_infrastructure/types/book.entity";
import BookCard from "./_components/BookCard";
import { BookTagEnum } from "./_infrastructure/enums/book.enum";
import React from "react";
import { BookAction } from "./_infrastructure/actions/book.action";

const dataLoadScroll = 20;

export default function Home() {
  const [data, setData] = React.useState<TBook[]>([]);
  const [dataTake, setDataTake] = React.useState<number>(dataLoadScroll);
  const loader = React.useRef(null);

  React.useEffect(() => {
    BookAction.list(setData, { take: dataTake });
  }, [dataTake]);

  React.useEffect(() => {
    const options = { rootMargin: "20%", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);
  }, []);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) setDataTake((prev) => prev + dataLoadScroll);
  };

  const tags = Object.values(BookTagEnum);

  return (
    <main className="bg-gray-900">
      <div>
        <div>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="m-0.5 bg-blue-900 rounded-5 px-1 py-0.5 text-xs font-semibold text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between py-8 px-4 sm:px-8 md:px-24 lg:px-32 xl:px-48">
        <div className="mb-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              writerName={book.writerName}
              coverUrl={book.coverUrl}
              pointPrice={book.pointPrice}
              tags={book.tags}
            />
          ))}
          <div ref={loader} />
        </div>
      </div>
    </main>
  );
}
