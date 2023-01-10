const express = require('express');
const router = express();
const categoryController = require('../controller/categoryController')
const { auth } = require('../middleware/auth')

router.get('/category', auth, categoryController.category);

router.post('/api/category', auth, categoryController.addDate);

router.put('/api/category/update/:id', auth, categoryController.editData);

router.delete('/api/category/delete/:id', auth, categoryController.deleteData)

router.delete('/api/category/delete', auth, categoryController.deleteData9);






module.exports = router;

