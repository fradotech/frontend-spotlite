import { API } from "@/app/_infrastructure/api.service";
import { TBook } from "../types/book.entity";
import {
  TApiListResponse,
  TApiQueryRequest,
  TApiResponse,
} from "@/app/_infrastructure/api.contract";

export class BookAction {
  static async list(
    setData?: React.Dispatch<React.SetStateAction<TBook[]>>,
    query?: TApiQueryRequest
  ): Promise<void | TBook[]> {
    API.get("/books", query).then(
      (response: TApiResponse<TApiListResponse<TBook>>) => {
        return setData ? setData(response.data.rows) : response.data.rows;
      }
    );
  }
}
