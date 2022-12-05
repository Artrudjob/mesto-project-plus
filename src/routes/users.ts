import { Router } from 'express';
import {createUser, findByUserId, getAllUsers, updateAvatarUser, updateProfileUser} from '../controllers/users';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:userId', findByUserId);
router.post('/users', createUser);
router.patch('/users/me', updateProfileUser);
router.patch('/users/me/avatar', updateAvatarUser);

export { router };