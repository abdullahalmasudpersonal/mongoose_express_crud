import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserName,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
  },
  lustName: {
    type: String,
    trim: true,
    maxlength: [20, 'Password can not be more then 20 characters'],
    required: [true, 'Lust name is required'],
  },
});

const addressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, 'Street name is required'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City name is required'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country name is required'],
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    trim: true,
    unique: true,
    required: [true, 'UserId is required'],
  },
  userName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'User Name is required'],
  },
  password: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: fullNameSchema,
    trim: true,
    required: [true, 'Full name is required'],
  },
  age: {
    type: Number,
    trim: true,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    trim: true,
    required: [true, 'Active status is required'],
    default: false,
  },
  hobbies: [
    {
      type: String,
      trim: true,
      required: [true, 'Hobbies is required'],
    },
  ],
  address: {
    type: addressSchema,
    trim: true,
    required: [true, 'Address is required'],
  },
});

/// pre save middleware / hooks : will work on create() save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function () {
  console.log(this, 'post hook : we saved our data');
});

// create a custom static method

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// creating a custom instance method
// userSchema.methods.isUserExists = async function (userId: string) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };

export const User = model<TUser, UserModel>('User', userSchema);
