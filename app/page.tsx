import { TApiListResponse, TApiResponse } from "./_infrastructure/api.contract";
import { API } from "./_infrastructure/api.service";
import { TBook } from "./(book)/_infrastructure/types/book.entity";
import Card from "./_components/molecules/card";

export default async function Home() {
  const response: TApiResponse<TApiListResponse<TBook>> = await API.get(
    "/books"
  );
  const books = response.data.rows;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900">
      <div className="mb-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books?.map((book) => (
          <Card
            key={book.id}
            title={book.title}
            writerName={book.writerName}
            coverUrl={book.coverUrl}
            pointPrice={book.pointPrice}
            tags={book.tags}
          />
        ))}
      </div>
    </main>
  );
}
