import { Schema, model } from 'mongoose';
import { TUser, TUserAddress, TUserName } from './user/user.interface';

const fullNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
  },
  lustName: {
    type: String,
    trim: true,
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

const userSchema = new Schema<TUser>({
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

export const UserModel = model<TUser>('User', userSchema);
