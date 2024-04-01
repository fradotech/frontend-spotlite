"use client";

import { TBook } from "./_infrastructure/types/book.entity";
import BookCard from "./_components/BookCard";
import { BookTagEnum } from "./_infrastructure/enums/book.enum";
import React from "react";
import { BookAction } from "./_infrastructure/actions/book.action";
import { TApiQueryRequest } from "../_infrastructure/api.contract";

const defaultQuery: TApiQueryRequest = {
  take: 10,
};

export default function Home() {
  const loader = React.useRef(null);
  const [data, setData] = React.useState<TBook[]>([]);
  const [query, setQuery] = React.useState<TApiQueryRequest>({
    take: defaultQuery.take * 2,
  });

  React.useEffect(() => {
    BookAction.list(setData, query);
  }, [query]);

  React.useEffect(() => {
    const options = { rootMargin: "20%", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);
  }, []);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setQuery((prev) => ({
        ...prev,
        take: (prev?.take || defaultQuery.take) + defaultQuery.take,
      }));
    }
  };

  const handleFilter = (tag: BookTagEnum) => {
    setQuery((prev) => {
      const prevQuery = { ...prev, filterBy: "tags" };
      if (prevQuery.filterValues?.includes(tag)) {
        return {
          ...prevQuery,
          filterValues: prevQuery.filterValues?.filter(
            (value) => value !== tag
          ),
        };
      } else {
        return {
          ...prevQuery,
          filterValues: [...(prevQuery.filterValues || []), tag],
        };
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(prev => ({ ...prev, search: value }));
  };

  const tags = Object.values(BookTagEnum);

  return (
    <main className="px-4 sm:px-8 md:px-24 lg:px-32 xl:px-64">
      <div className="flex justify-center items-center flex-col">
        <div className="w-full p-2">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap p-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilter(tag)}
              className={`m-1 font-semibold py-1 px-4 rounded-full ${
                query.filterValues?.includes(tag)
                  ? "bg-blue-900 hover:bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between py-2">
        <div className="mb-32 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-0 sm:gap-4">
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
