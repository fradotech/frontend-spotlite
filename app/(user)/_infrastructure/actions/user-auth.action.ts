import { API } from "@/app/_infrastructure/api.service";
import { TUser } from "../types/user.entity";
import { TApiResponse } from "@/app/_infrastructure/api.contract";

export class UserAuthAction {
  static async account(
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>
  ): Promise<void> {
    API.get("/users/account").then((response: TApiResponse<TUser>) => {
      setUser(response.data);
    });
  }

  static async login(data: { email: string; password: string }): Promise<boolean> {
    const response: TApiResponse<TUser> = await API.post("/users/login", data);

    if (response?.data?._accessToken) {
      const _accessToken = `Bearer ${response.data._accessToken}`;
      localStorage.setItem("_accessToken", _accessToken);
      return true
    }

    return false;
  }
}
