import express from 'express';
import { listReviewer, listReviewForm, reviewReport } from '../controllers/reviewer';
const router = express.Router();
router.get('/review', listReviewer );
router.get('/reivewForm', listReviewForm)
router.get('/reivewReport', reviewReport)

module.exports = router;