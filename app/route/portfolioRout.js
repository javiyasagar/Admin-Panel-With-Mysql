const express = require('express');
const router = express();
const portfolioController = require('../controller/portfolioController')
const { auth } = require('../middleware/auth')
const { upload } = require("../services/multer");

router.get('/portfolio', auth, portfolioController.portfolio);

router.post('/api/portfolio', upload.array('projectImage', 5), portfolioController.addData2);

router.put('/api/portfolio/update/:id', auth, upload.array('projectImage', 5), portfolioController.editData12);

router.delete('/api/portfolio/delete/:id', auth, portfolioController.deleteData18);

router.delete('/api/portfolio/delete', auth, portfolioController.deleteData124);




module.exports = router;

