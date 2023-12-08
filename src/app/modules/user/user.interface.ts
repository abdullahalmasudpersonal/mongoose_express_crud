import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lustName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName?: string;
  price?: number;
  quantity?: number;
};

export type TUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders?: TOrder[];
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<TUser | null>;
}

// for creating instance

// export interface UserMethod {
//   isUserExists(userId: string): Promise<TUser | null>;
// };

// export type UserModel = Model<TUser, Record<string, never>, UserMethod>;
