import { TBaseEntity } from "@/app/_infrastructure/base.entity";

export type TUser = TBaseEntity & {
  id: number;
  name: string;
  email: string;
  password: string;
  point: number;
};
