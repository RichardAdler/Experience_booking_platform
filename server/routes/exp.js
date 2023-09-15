const express = require('express');
const router = express.Router();
const expController = require('../controllers/expController');
const upload = require('../../middleware/multer');


//Home page render with top 4 experiences for the carousel
router.get('/', expController.getTopExperiences);
//Experiences page render
router.get('/experiences', expController.exp);

//Search activity for a Region or Country or both
router.get('/search', expController.search);
//Add new activity 
router.post('/add', upload.single('img_url'), expController.add);
//Delete an activity
router.put('/book/:id', expController.book);

router.post('/experiences', expController.searchByType);

router.post('/experience/book/:id', expController.bookExperience);

router.get('/addExperience', expController.get_all, expController.addExperience);

router.get('/api/experiences', expController.get_all_json);

router.get('/map', expController.get_all, expController.getMap);

router.get('/experiences', expController.get_all, (req, res) =>{
    res.json(res.locals.experiences);
});

module.exports = router;