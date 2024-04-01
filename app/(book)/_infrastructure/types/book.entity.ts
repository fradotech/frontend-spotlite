import { TBaseEntity } from "@/app/_infrastructure/base.entity";
import { BookTagEnum } from "../enums/book.enum";

export type TBook = TBaseEntity & {
  id: number;
  title: string;
  writerName: string;
  coverUrl: string;
  pointPrice: number;
  tags: Array<BookTagEnum>;
};
