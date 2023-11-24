import { TUser } from './user.interface';
import { User } from '../user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId.toString())) {
    throw new Error('User alrady exists!');
  }

  const result = await User.create(userData); // build in static method

  // const user = new User(userData);
  // if (await user.isUserExists(userData.userId.toString())) {
  //   throw new Error('User alrady exists!');
  // }

  // const result = await user.save(); // build in inst
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
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
