import { TUser } from './user.interface';
import { User } from './user.model';

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
  //const result = await User.aggregate([{ $match: { userId: userId } }]);
  return result;
};

const updateSingleUserFromDB = async (userId: string, userData: TUser) => {
  if (await User.isUserExists(userData.userId.toString())) {
    //throw new Error("Your userId dose't exists!");
  } else {
    throw new Error("Your userId dose't exists!");
  }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const result = await User.updateOne({ userId }, userData);
  const user = await User.findOne({ userId });
  return user;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

// const userOrderUpdateFromDB = async (userId: string, orderInfo: TOrder) => {
//   try {
//     if (await User.isUserExists(userId.toString())) {
//       ////////// anything
//     } else {
//       throw new Error('User is not exists!');
//     }
//     const existUser = await User.findOne({ userId });
//   } catch (err) {
//     ///
//   }
// };

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateSingleUserFromDB,
  // userOrderUpdateFromDB,
};
