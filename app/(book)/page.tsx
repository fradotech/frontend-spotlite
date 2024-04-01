import {
  TApiListResponse,
  TApiResponse,
} from "../_infrastructure/api.contract";
import { API } from "../_infrastructure/api.service";
import { TBook } from "./_infrastructure/types/book.entity";
import BookCard from "./_components/BookCard";
import { BookTagEnum } from "./_infrastructure/enums/book.enum";

export default async function Home() {
  const response: TApiResponse<TApiListResponse<TBook>> = await API.get(
    "/books"
  );
  const books = response.data.rows;

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
          {books?.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              writerName={book.writerName}
              coverUrl={book.coverUrl}
              pointPrice={book.pointPrice}
              tags={book.tags}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
