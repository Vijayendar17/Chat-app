import express from 'express';
import { login, logout,signup,checkAuth,updateProfile} from '../controllers/auth.controllers.js';
import {protectRoute} from '../middleware/auth.middleware.js'
const router = express.Router();

router.post('/login',login)
router.post('/logout',logout)
router.post('/signup',signup)
router.get('/check',protectRoute,checkAuth)
router.put('/updateProfile',protectRoute,updateProfile)

export default router;