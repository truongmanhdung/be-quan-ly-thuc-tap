import express from 'express';
const router = express.Router();

import { listStudent, readOneStudent, removeStudent, updateStudent } from '../controllers/student';
router.get('/products', listStudent );
router.get('/product/:id', readOneStudent);
router.patch('/product/:id', updateStudent);
router.delete('/product/:id', removeStudent);
module.exports = router;