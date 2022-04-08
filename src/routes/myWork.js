import express from 'express';
import { listReviewer, listReviewForm } from '../controllers/reviewer';
const router = express.Router();
router.get('/review', listReviewer );
router.get('/reivewForm', listReviewForm)
module.exports = router;