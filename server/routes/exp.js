const express = require('express');
const router = express.Router();
const expController = reqiure('../controllers/expController')


//Home page render
router.get('/', expController.places);
//Search activity for a Region
router.get('/search/:region', expController.searchByRegion);
//Add new activity 
router.post('/add', expController.add);
//Delete an activity
router.delete('/delete/:id', expController.delete);

module.exports = router;