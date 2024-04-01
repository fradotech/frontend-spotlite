import axios, { AxiosError, AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { config } from "./config";
import { TApiQueryRequest, TApiResponse } from "./api.contract";
import { toast } from "react-toastify";

const headers: RawAxiosRequestHeaders | AxiosHeaders = {
  Authorization:
    typeof window !== "undefined"
      ? `Bearer ${localStorage.getItem("_accessToken")}`
      : null,
};

const axiosInstance = axios.create({ baseURL: config.server.hostApi, headers });

const notificationError = (e: AxiosError<TApiResponse<unknown>>): void => {
  // if (e.response?.data.message === 'Forbidden') {
  //   return
  // } else if (e.response?.data.message === 'Unauthorized') {
  //   localStorage.removeItem('_accessToken')
  //   localStorage.removeItem('user')
  //   location.reload()
  // }

  const errorMessage = e.response?.data?.message || String(e);

  console.error({ apiError: errorMessage || String(e) });
  toast.error(errorMessage);
};

export class API {
  static async get(endpoint: string, params?: TApiQueryRequest): Promise<any> {
    try {
      const queryString = params
        ? "?" +
          new URLSearchParams(
            Object.entries(params).flatMap(([key, value]) =>
              Array.isArray(value)
                ? value.map((v, i) => [`${key}[${i}]`, String(v)])
                : [[key, String(value)]]
            )
          ).toString()
        : "";

      const token = localStorage.getItem("_accessToken");
      const headers = new Headers();
      headers.append("Authorization", token || "");

      const data = await fetch(
        `${config.server.hostApi}${endpoint}${queryString}`,
        {
          headers,
          ...(config.server.nodeEnv !== "production"
            ? {
                next: { revalidate: 1 },
              }
            : undefined),
        }
      );
      this.catch({ data });

      return data.json();
    } catch (e: unknown) {
      notificationError(e as AxiosError<TApiResponse<unknown>>);
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
      notificationError(e as AxiosError<TApiResponse<unknown>>);
      return e;
    }
  }

  private static catch(res: any): void {
    !res.data && console.error({ apiError: res.response.data.message });
  }
}
