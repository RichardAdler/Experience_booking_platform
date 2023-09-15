const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// render login page
router.get('/login', usersController.login_page);
// handle login
router.post('/login', usersController.login);
// render register page
router.get('/register', usersController.register_page);
// handle register
router.post('/register', usersController.register);
// logout
router.get('/logout', usersController.logout);

module.exports = router;