import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { createUserValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // data validation using zod
    const zodParsedata = createUserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParsedata);
    res.status(200).json({
      success: true,
      message: 'User created  successfully!',
      //data: result,
      data: {
        userId: result.userId,
        username: result.username,
        fullName: {
          firstname: result.fullName.firstName,
          lustName: result.fullName.lastName,
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
      error: {
        code: 404,
        description: 'Something went wrong',
        err,
      },
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
      error: {
        code: 404,
        description: 'Something went wrong',
        err,
      },
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
      error: {
        code: 404,
        description: 'Something went wrong',
        err,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const result = await UserServices.updateSingleUserFromDB(userId, userData);
    if (!result) {
      throw new Error('User not found!');
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
      message: err.message || 'Something went wrong!',
      error: {
        code: 404,
        description: 'Something went wrong!',
        err,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    if (!result) {
      throw new Error('Failed to delete user');
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
      error: {
        code: 404,
        description: 'Something went wrong',
        err,
      },
    });
  }
};

const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;
    const orderInfo = {
      productName,
      price,
      quantity,
    };
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await UserServices.userOrderUpdateFromDB(userId, orderInfo);
    res.status(200).json({
      success: true,
      message: 'Order updated successfully!!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'Something went wrong',
        err,
      },
    });
  }
};

const getOrdersSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrdersSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Get orders for single user successfully!!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User order get error',
        err,
      },
    });
  }
};

const getTotalPriceSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'Something went wrong',
        err,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateSingleUser,
  updateUserOrder,
  getOrdersSingleUser,
  getTotalPriceSingleUser,
};
