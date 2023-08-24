const express = require('express');
const router = express.Router();
const expController = require('../controllers/expController')


router.post('/register', expController.registerUser);


module.exports = router;