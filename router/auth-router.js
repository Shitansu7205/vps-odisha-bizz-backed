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
import forgotPassword from '../controllers/forgotPassword.js';
import resetPassword from '../controllers/resetPassword.js';
import getSingleListing from '../controllers/getSingleListing.js';

import { addComment, getCommentsByListing } from '../controllers/commentController.js'





import getCategorySuggestions from '../controllers/getCategorySuggestions.js'
import getAllListings from '../controllers/getAllListings.js';



const router = express.Router();


router.get('/test', test);

router.get('/check-auth', verifyToken, (req, res) => res.status(200).json({ message: "Authenticated" }));

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.get('/dashboard', verifyToken, dashboard);
router.post('/post-listings', verifyToken, upload.single("image"), listing);
router.get('/get-listings', getlistings);
router.get("/get-listing/:slug", getSingleListing);

router.put('/update-listings/:id', verifyToken, upload.single("image"), updatelisting);
router.delete('/delete-listings/:id', verifyToken, deletelisting);
router.get('/get-category-listings/:category', getlistingscategory);
router.post('/lead-form', createLead);
router.get('/lead-form', verifyToken, getLeads);


router.post("/comments/add-comment", verifyToken, addComment);
router.get("/comments/:listingId", getCommentsByListing);



router.get("/search-suggestions", getCategorySuggestions);
router.get("/all-products", getAllListings);



export default router;
