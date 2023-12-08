import { TOrder, TUser } from './user.interface';
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
  const result = await User.find()
    .select('-userId')
    .select('-password')
    .select('-_id')
    .select('-fullName._id')
    .select('-isActive')
    .select('-hobbies')
    .select('-isDeleted')
    .select('-address._id')
    .select('-orders')
    .select('-__v');
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId })
    .select('-password')
    .select('-_id')
    .select('-fullName._id')
    .select('-isDeleted')
    .select('-address._id')
    .select('-orders')
    .select('-__v');
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
  const user = await User.findOne({ userId })
    .select('-password')
    .select('-_id')
    .select('-fullName._id')
    .select('-isDeleted')
    .select('-address._id')
    .select('-orders')
    .select('-__v');
  return user;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });

  return result;
};

const userOrderUpdateFromDB = async (userId: string, orderInfo: TOrder) => {
  try {
    if (await User.isUserExists(userId.toString())) {
      // throw new Error('User already exists!')
    } else {
      throw new Error('User not found!');
    }

    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      throw new Error('User not found');
    }

    if (!existingUser.orders) {
      existingUser.orders = []; // Create 'orders' array if it doesn't exist
    }

    existingUser.orders.push(orderInfo); // Add new order to the 'orders' array

    const result = await existingUser.save();
    return result;
  } catch (err) {
    throw new Error('The orders does not exist');
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateSingleUserFromDB,
  userOrderUpdateFromDB,
};
