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
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: string): Promise<TUser | null>;
}

// for creating instance

// export interface UserMethod {
//   isUserExists(userId: string): Promise<TUser | null>;
// };

// export type UserModel = Model<TUser, Record<string, never>, UserMethod>;
