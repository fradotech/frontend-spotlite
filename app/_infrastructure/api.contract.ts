export type TApiQueryRequest = {
  take?: number;
  search?: string;
  filterBy?: string;
  filterValue?: string;
  filterValues?: Array<string>;
}

export type TApiResponse = {
  message?: string;
  data: Record<string, any> | null;
};

