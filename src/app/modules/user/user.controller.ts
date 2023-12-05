import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // data validation using zod
    /// const zodParsedata = createUserValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User created  successfully!',
      //data: result,
      data: {
        userId: result.userId,
        username: result.userName,
        fullName: {
          firstname: result.fullName.firstName,
          lustName: result.fullName.lustName,
        },
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: {
          street: result.address.street,
          city: result.address.city,
          country: result.address.country,
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const result = await UserServices.updateSingleUserFromDB(userId, userData);
    if (!result) {
      throw new Error("Your userId dose't exists!");
    }

    res.status(200).json({
      success: true,
      message: "User's updated succesfully",
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    if (!result) {
      throw new Error('Failed to delete student');
    }
    res.status(200).json({
      success: true,
      message: 'User was deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const userOrderUpdate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;

    const orderInfo = {
      productName,
      price,
      quantity,
    };

    const result = await UserServices.userOrderUpdateFromDB(userId, orderInfo);
    res.status(200).json({
      success: true,
      message: 'Order is created successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateSingleUser,
  userOrderUpdate,
};
