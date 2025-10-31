import express from 'express';
import test from '../controllers/test.js';

import verifyToken from '../middleware/auth.js';
import upload from "../middleware/multer.js";


import signup from '../controllers/signUp.js';
import login from '../controllers/login.js';
import dashboard from '../controllers/dashboard.js';
import logout from '../controllers/logout.js';
import listing from '../controllers/post-listings.js';
import getlistings from '../controllers/getlistings.js';
import updatelisting from '../controllers/updatelisting.js';
import deletelisting from '../controllers/deletelisting.js';
import getlistingscategory from '../controllers/getlistingscategory.js';
import { createLead, getLeads } from '../controllers/leadController.js';


const router = express.Router();


router.get('/test', test);

router.get('/check-auth', verifyToken, (req, res) => res.status(200).json({ message: "Authenticated" }));

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/dashboard', verifyToken, dashboard);
router.post('/post-listings', verifyToken, upload.single("image"), listing);
router.get('/get-listings', verifyToken, getlistings);
router.put('/update-listings/:id', verifyToken, upload.single("image"), updatelisting);
router.delete('/delete-listings/:id', verifyToken, deletelisting);
router.get('/get-category-listings/:category', getlistingscategory);
router.post('/lead-form', createLead);
router.get('/lead-form', verifyToken, getLeads);




export default router;
