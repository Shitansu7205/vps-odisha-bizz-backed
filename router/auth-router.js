import express from 'express';
import test from '../controllers/test.js';



import signup from '../controllers/signUp.js';
import login from '../controllers/login.js';


const router = express.Router();


router.get('/test', test);


router.post('/signup', signup);
router.post('/login', login);

export default router;
