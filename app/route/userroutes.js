const express = require('express');
const router = express();
const userController = require('../controller/usercontroller');
const { upload } = require("../services/multer");
const db = require('../middleware/db');
const { generateToken, auth } = require('../middleware/auth')





router.post("/authRegister", upload.single('Image'), userController.authRegister);

router.post("/authLogin", generateToken, userController.authLogin);

router.post("/verifyEmail", userController.verifyEmail);

router.post("/verifyOtp", userController.verifyOtp);

router.post("/updatePassword", userController.updatePassword);

router.post("/resetPass", auth, userController.resetPass);

router.get("/viewProfile", auth, userController.viewProfile);

router.post("/updateProfile", auth, upload.single("Image"), userController.updateProfile);









module.exports = router;
