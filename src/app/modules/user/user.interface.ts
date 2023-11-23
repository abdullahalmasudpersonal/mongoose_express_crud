export type TUserName = {
  firstName: string;
  lustName: string;
};

export type TUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies?: [string, string];
  address: {
    street: string;
    city: string;
    country: string;
  };
};
