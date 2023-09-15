const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactusController'); 
const multer = require('multer');
const upload = multer();


router.get('/contact', contactController.contact);
router.post('/submit-contact', upload.array(), contactController.submitContact);

module.exports = router;
