const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/booking', bookingController.booking_page);
router.post('/confirmBooking', bookingController.confirmBooking);

module.exports = router;