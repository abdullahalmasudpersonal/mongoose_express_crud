import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../utils/validateRequiest';
import { createUserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/',
  /* validateRequest(createUserValidationSchema), */
  UserControllers.createUser,
);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.put('/:userId', UserControllers.updateSingleUser);

router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId/orders', UserControllers.userOrderUpdate);

export const UserRoutes = router;
