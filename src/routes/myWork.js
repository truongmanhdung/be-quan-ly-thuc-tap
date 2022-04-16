import express from 'express';
import { listReviewer, listReviewForm, reviewReport } from '../controllers/reviewer';
import { authorizeRoles, isAuthenticateUser } from '../middlewares/CheckAuth';
const router = express.Router();
router.get('/review', isAuthenticateUser, listReviewer);
router.get('/reivewForm', isAuthenticateUser, listReviewForm)
router.get('/reivewReport', isAuthenticateUser, reviewReport)

module.exports = router;