const express = require('express');
const router = express.Router();
const expController = require('../controllers/expController')


//Home page render
router.get('/', expController.home);
//Home exp
router.get('/experiences', expController.exp);
//Search activity for a Region
router.get('/search/:region', expController.searchByRegion);
//Add new activity 
router.post('/add', expController.add);
//Delete an activity
router.put('/book/:id', expController.book);

module.exports = router;