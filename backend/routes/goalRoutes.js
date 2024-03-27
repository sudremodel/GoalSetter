const express = require('express')
const router = express.Router()
const {protect} =require("../middleware/authMiddleware")
const {getGoals, postGoals, putGoals, deleteGoals} = require('../controllers/goalControllers')
router.route('/').get(protect, getGoals).post(protect, postGoals)
router.route('/:id').put(protect, putGoals).delete(protect, deleteGoals)
module.exports = router