import express from 'express'
import { createSpecialization, getListSpecialization } from '../controllers/Specialization'

const router = express.Router()

router.post('/specialization',createSpecialization)
router.get('/specialization',getListSpecialization)

module.exports = router