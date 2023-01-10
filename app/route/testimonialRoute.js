const express = require('express');
const router = express();
const testimonialController = require('../controller/testimonialController');
const { auth } = require('../middleware/auth');
const { upload } = require("../services/multer");

router.get('/testimonial', auth, testimonialController.testimonial);

router.post('/api/testimonial', auth, upload.single('image'), testimonialController.addData3);

router.put('/api/testimonial/update/:id', auth, upload.single('image'), testimonialController.editData5);

router.delete('/api/testimonial/delete/:id', auth, testimonialController.deleteData7);

router.delete('/api/testimonial/delete', auth, testimonialController.deleteData0014);



module.exports = router;
