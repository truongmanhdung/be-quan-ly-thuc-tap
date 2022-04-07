import express from 'express';
import { listReviewer } from '../controllers/reviewer';
const router = express.Router();
router.get('/review', listReviewer );

module.exports = router;