import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId', UserControllers.updateSingleUser);

router.put('/:userId/orders', UserControllers.userOrderUpdate);

export const UserRoutes = router;
