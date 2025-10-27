import express from 'express';
import test from '../controllers/test.js';

import verifyToken from '../middleware/auth.js';

import signup from '../controllers/signUp.js';
import login from '../controllers/login.js';
import dashboard from '../controllers/dashboard.js';
import logout from '../controllers/logout.js';
import listing from '../controllers/post-listings.js';


const router = express.Router();


router.get('/test', test);


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/dashboard', verifyToken, dashboard);
router.post('/post-listings', listing);



export default router;
