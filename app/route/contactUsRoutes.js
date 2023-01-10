const express = require('express');
const router = express();
const contactUsController = require('../controller/contactUsController');
const { auth } = require('../middleware/auth');

router.get('/contactUs', auth, contactUsController.contactUs);

router.post('/api/contactUs', auth, contactUsController.addDated);

router.put('/api/contactUs/update/:id', auth, contactUsController.editDated);

router.delete('/api/contactUs/delete/:id', auth, contactUsController.deleteDated);

router.get('/api/contactUs/delete', auth, contactUsController.deleteData001);





module.exports = router;
