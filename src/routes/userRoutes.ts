/* eslint-disable no-multiple-empty-lines */
import { Router } from "express";
import UserController from '../controllers/userController';
import checkUserAuth from '../middleware/auth-middleware';

const router = Router();

// Route Level Middleware - To Protect Route
// router.use('/changepassword', checkUserAuth);
router.use('/loggeduser', checkUserAuth);
router.use('/logoutuser', checkUserAuth);
router.use('/dashboard', checkUserAuth);

// public routes
router.post('/register',UserController.userRegistration);
// router.get('/login', UserController.userLoginGet);
router.post('/login', UserController.userLogin);

   // protected routes
router.post('/changepassword/:id', UserController.changeUserPassword);


export default router;
