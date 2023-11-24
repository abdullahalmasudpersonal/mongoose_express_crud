import { TUser } from './user.interface';
import { UserModel } from '../user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// const updateSingleUserFromDB = async (userId: string, userData: TUser) => {
//   if (await UserModel.isUserExists(userData.userId.toString())){
//     // throw new Error('User already exists!')
//   }
//   else{
//     throw new Error('User dose not exists!');
//   }
//   const result = await UserModel.updateOne({ userId }, userData);
//   return result;
// };

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  // updateSingleUserFromDB,
};
