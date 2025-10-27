import express from 'express';
import test from '../controllers/test.js';



import signup from '../controllers/signUp.js';

const router = express.Router();


router.get('/test', test);


router.post('/signup', signup);

export default router;
