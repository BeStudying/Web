import { Router } from 'express';
import authJWT from '../middlewares/authJWT'

import {
  getAll,
  getById,
  register,
  login,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';

export const router = Router();

router.get('/', authJWT, getAll);
router.get('/:id', authJWT, getById);
router.put('/', authJWT, updateUser);
router.delete('/:id', authJWT, deleteUser);
router.post('/register', register);
router.post('/auth', login);

export default router;