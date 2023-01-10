const { validateUser, loginUsers, passwordValidat, otpValidate, newPasswordValidat, resetpValidat, profileValidate } = require('../validation/uservalidation');
const bcrypt = require('bcrypt');
const connection = require('../middleware/db');
const logger = require('../loggers/logger');
const { sendOTP } = require('../services/mail')
const saltRounds = 10;

let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);


exports.authRegister = async (req, res) => {
    // console.log("body", req.body);
    try {
        let { error } = validateUser(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        else {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            const name = req.body.name;
            const email = req.body.email;
            const phoneNo = req.body.phoneNo;
            const gender = req.body.gender;
            const password = req.body.password;
            const Image = req.file.filename;
            const city = req.body.city;
            const hobby = req.body.hobby;
            const USE = `INSERT INTO register (name,email,phoneNo,gender,password,Image,city,hobby) VALUES('${name}','${email}','${phoneNo}','${gender}','${password}','${Image}','${city}','${hobby}')`;
            connection.query(USE, (err, result) => {
                console.log(result);
                if (err) {
                    logger.error('Error', err);
                } else {
                    res.send("Data Enter...")
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.authLogin = async (req, res) => {
    try {
        let { error } = loginUsers(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        else {
            const email = req.body.email;
            const password = req.body.password;
            connection.query(`SELECT * FROM register WHERE email = ?  `, [email], async function (err, results, fields) {
                if (err) {
                    res.send("email Enter in project...")
                    console.log(err);
                }
                else {
                    if (results.length > 0) {
                        const connection1 = await bcrypt.compare(password, results[0].password)
                        if (connection1) {
                            res.send("login done...")
                        }
                        else {
                            res.send("password is not connecte....")
                        }
                    }
                    else {
                        res.send("email not Enter in project...")
                    }
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        let { error } = passwordValidat(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        else {
            const email = req.body.email;
            connection.query(`SELECT * FROM register WHERE email = ?  `, [email], async function (err, results, fields) {
                if (results) {
                    sendOTP(req.body.email, otp);
                    res.send('otp send.....')
                }
                else {
                    res.send('user not found.....')
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let { error } = otpValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        else {
            if (otp == req.body.otp) {
                return res.send('otp is verify...');

            } else {
                return res.send('Please enter correct OTP...');
            }
        }
    }
    catch (err) {
        console.log(error);
    }
}

exports.updatePassword = async (req, res) => {
    try {
        let { error } = newPasswordValidat(res.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        else {
            const email = req.body.email;
            connection.query(`SELECT * FROM register WHERE email = ?  `, [email], async function (err, results, fields) {
                const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
                if (results) {
                    if (encryptedPassword) {
                        connection.query(`UPDATE register set password = ?  WHERE email = ?`, [encryptedPassword, email]);
                        res.send("update password is compar...")
                    }
                    else {
                        res.send('update password not found.....')
                    }
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.resetPass = async (req, res) => {
    try {
        let { error } = resetpValidat(res.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message)
        }
        else {
            const password = req.body.currentPassword;
            const email = req.user.email
            console.log(email);
            connection.query('SELECT password FROM register  WHERE email=?', [email], async (err, result) => {
                if (result) {

                    console.log(result[0].password);
                    const validPassword = await bcrypt.compare(password, result[0].password);

                    if (validPassword) {
                        const newpassword = req.body.newpassword;
                        //    console.log(newpassword);
                        const salt = await bcrypt.genSalt(10);
                        const bcryptpassword = await bcrypt.hash(newpassword, salt);

                        // console.log(req.params.id);
                        console.log(bcryptpassword);
                        connection.query(`UPDATE register SET password = ? WHERE email =?`, [bcryptpassword, email], (err, response) => {

                            if (response) {
                                // console.log(response);
                                res.send('password is a updated.....')
                            } else {
                                logger.error('Error', err);
                            }
                        })
                    } else {
                        res.send('password is not updated.....')
                    }
                } else {
                    logger.error('Error', err);
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.viewProfile = async (req, res) => {
    try {
        const email = req.user.email;
        console.log(email);
        connection.query('SELECT * FROM register  WHERE email=?', [email], async (err, result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.send('profile is not updated.....');
                logger.error(err)
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let { error } = profileValidate(res.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        else {
            const email = req.user.email;
            connection.query(`SELECT * FROM register WHERE email = ?  `, [email], async function (err, results, fields) {
                if (results) {
                    const name = req.body.name;
                    const email = req.body.email;
                    const phoneNo = req.body.phoneNo;
                    const gender = req.body.gender;
                    const Image = req.file.filename;
                    const city = req.body.city;
                    const hobby = req.body.hobby;
                    connection.query(`UPDATE register set name='${name}',email='${email}',phoneNo='${phoneNo}',gender='${gender}',Image='${Image}',city='${city}',hobby='${hobby}' WHERE email = ?`, [email], async (err, result) => {
                        if (result) {
                            res.send('data is Update.....')
                        }
                        else {
                            res.send('data is not update.....')
                            logger.error(err);
                        }
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}



// db.query(`SELECT * FROM categories WHERE categoryName = ?`, [category], (err, result) => {
//     if (result) {
//         const mulImg = req.files.map((mulImg) => mulImg.filename);
//         const proj_category = result[0].id;
//         const proj_name = req.body.proj_name;
//         const proj_title = req.body.proj_title;
//         const proj_image = mulImg;
//         const proj_date = req.body.proj_date;
//         const proj_desc = req.body.proj_desc;








