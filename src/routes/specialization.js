import express from 'express'
import { createSpecialization, getListSpecialization } from '../controllers/specialization'

const router = express.Router()

router.post('/specialization', createSpecialization)
router.get('/specialization', getListSpecialization)

module.exports = router