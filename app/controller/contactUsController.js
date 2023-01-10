const { validationContactUs } = require('../validation/contactUsValidation');
const connection = require('../middleware/db');
const logger = require('../loggers/logger');


exports.addDated = async (req, res) => {
    console.log("df", req.body);
    try {
        let { error } = validationContactUs(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        else {
            const name = req.body.name;
            const email = req.body.email;
            const message = req.body.message;
            const phoneNumber = req.body.phoneNumber;
            const date = req.body.date;
            const sql = `INSERT INTO contactus(name,email,message,phoneNumber,date) VALUES('${name}','${email}','${message}','${phoneNumber}','${date}')`;
            connection.query(sql, (err, result) => {
                console.log(result);
                if (err) {
                    logger.error('Error', err);
                }
                else {
                    res.send("Data Enter...");
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
};

exports.contactUs = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM register WHERE id = ?`, [id], async (err, response) => {
            if (response) {
                connection.query(`SELECT * FROM contactus`, async (err, response1) => {
                    if (response1) {
                        res.send(response1);
                    }
                    else {
                        res.send('contactus Not found!');
                    }
                });
            }
            else {
                res.send('Not valid email!');
            }
        });
    }
    catch (err) {
        logger.error("err", err);
    }
}



exports.editDated = async (req, res) => {
    try {
        let { error } = validationContactUs(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        else {
            const id = req.params.id;
            connection.query(`SELECT * FROM contactus WHERE id = ?  `, [id], async function (err, params) {
                if (params) {
                    console.log(error);
                    const name = req.body.name;
                    const email = req.body.email;
                    const message = req.body.message;
                    const phoneNumber = req.body.phoneNumber;
                    const date = req.body.date;

                    connection.query(`UPDATE contactus set name='${name}',email='${email}',message='${message}',phoneNumber='${phoneNumber}',date='${date}' WHERE id = ?`, [id], async (err, result) => {
                        if (result) {
                            res.send('data is Update.....');
                        }
                        else {
                            res.send('data is not update.....');
                            logger.error(err);
                        }
                    })
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.deleteDated = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM contactus WHERE id = ?  `, [id], async function (err, params) {
            if (params) {
                connection.query(`DELETE FROM contactus   WHERE id = ?`, [id], async function (err, result) {
                    if (result) {
                        res.send('data is delete.....');
                    }
                    else {
                        res.send('data is not delete.....');
                        logger.error(err);
                    }
                })
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
exports.deleteData001 = async (req, res) => {
    try {
        const id = req.body.id;
        // ['1'] = ('1')
        // IN('" + id.join("', '") + "')
        // console.log(id.join("''"));
        connection.query("DELETE FROM contactus WHERE id IN ('" + id.join("', '") + "')", async function (err, result) {
            console.log(err);
            if (err) {
                logger.error('Error', err);
            }
            console.log(result);
            if (result) {
                res.send('selected data is delete.....');
            }
            else {
                res.send('selected data is not delete.....');
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}





