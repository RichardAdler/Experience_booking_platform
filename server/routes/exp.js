const express = require('express');
const router = express.Router();
const expController = require('../controllers/expController')


//Home page render with top 4 experiences for the carousel
router.get('/', expController.getTopExperiences);
//Experiences page render
router.get('/experiences', expController.exp);
//Contact page render
router.get('/contact', expController.contact);
//Search activity for a Region
router.get('/search/:region', expController.searchByRegion);
//Add new activity 
router.post('/add', expController.add);
//Delete an activity
router.put('/book/:id', expController.book);

module.exports = router;