import axios, { AxiosError, AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { config } from "./config";
import { TApiQueryRequest, TApiResponse } from "./api.contract";

const headers: RawAxiosRequestHeaders | AxiosHeaders = {
  Authorization:
    typeof window !== "undefined"
      ? `Bearer ${localStorage.getItem("_accessToken")}`
      : null,
};

const axiosInstance = axios.create({ baseURL: config.server.hostApi, headers });

const notificationError = (e: AxiosError<TApiResponse>): void => {
  // if (e.response?.data.message === 'Forbidden') {
  //   return
  // } else if (e.response?.data.message === 'Unauthorized') {
  //   localStorage.removeItem('_accessToken')
  //   localStorage.removeItem('user')
  //   location.reload()
  // }

  console.error({ apiError: e.response?.data?.message || String(e) });
};

export class API {
  static async get(endpoint: string, params?: TApiQueryRequest): Promise<any> {
    try {
      const queryString = params
        ? "?" + new URLSearchParams(Object.entries(String(params)))
        : "";

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("_accessToken")
          : undefined;

      const headers = new Headers();
      headers.append("Authorization", token || "");

      const data = await fetch(
        `${config.server.hostApi}${endpoint}${queryString}`,
        {
          headers,
          ...(config.server.nodeEnv !== "production"
            ? {
                next: { revalidate: 60 },
              }
            : undefined),
        }
      );
      this.catch({ data });

      return data.json();
    } catch (e: unknown) {
      console.log({ e });
      notificationError(e as AxiosError<TApiResponse>);
      return e;
    }
  }

  static async post(
    endpoint: string,
    data?: Record<string, any>
  ): Promise<any> {
    return await this.execute("post", endpoint, data);
  }

  static async put(endpoint: string, data?: Record<string, any>): Promise<any> {
    return await this.execute("put", endpoint, data);
  }

  static async patch(
    endpoint: string,
    data?: Record<string, any>
  ): Promise<any> {
    return await this.execute("patch", endpoint, data);
  }

  static async delete(endpoint: string): Promise<any> {
    return await this.execute("delete", endpoint);
  }

  private static async execute(
    method: "post" | "put" | "patch" | "delete",
    endpoint: string,
    data?: Record<string, any>
  ): Promise<any> {
    try {
      const response = await axiosInstance[method](endpoint, data);

      this.catch(response.data);

      return response.data;
    } catch (e: unknown) {
      notificationError(e as AxiosError<TApiResponse>);
      return e;
    }
  }

  private static catch(res: any): void {
    !res.data && console.error({ apiError: res.response.data.message });
  }
}
