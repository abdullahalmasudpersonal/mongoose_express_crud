import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // data validation using zod
    const zodParsedata = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedata);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went woring',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'User created  successfully!',
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
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: {
        userId: result?.userId,
        username: result?.userName,
        fullName: {
          firstname: result?.fullName.firstName,
          lustName: result?.fullName.lustName,
        },
        age: result?.age,
        email: result?.email,
        isActive: result?.isActive,
        hobbies: result?.hobbies,
        address: {
          street: result?.address.street,
          city: result?.address.city,
          country: result?.address.country,
        },
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// const updateSingleUser = async (req: Request, res: Response) => {
//   try {
//     const { user: userData } = req.body;
//     const { userId } = req.params;
//     // const filter = { _id: new ObjectId(id) };
//     // const options = { upsert: true };
//     // const updateDoc = {
//     //   $set: {
//     //     userData,
//     //   },
//     // };

//     const result = await UserServices.updateSingleUserFromDB(userData, userId);

//     res.status(200).json({
//       success: true,
//       message: 'User is created succesfully',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  // updateSingleUser,
};
