export type TApiQueryRequest = {
  take?: number;
  search?: string;
  filterBy?: string;
  filterValue?: string;
  filterValues?: Array<string>;
}

export type TApiListResponse<T> = {
  count: number;
  rows: Array<T>;
}

export type TApiResponse<T> = {
  message?: string;
  data: T;
};

