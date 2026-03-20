const BookingController = require('../controllers/BookingController')
const express = require('express')
const router = express.Router()

router.get('/', BookingController.getAllBookings)

module.exports = router