const { validationCategory } = require('../validation/categoryValidation');
const connection = require('../middleware/db');
const logger = require('../loggers/logger');
const { error } = require('npmlog');

exports.addDate = async (req, res) => {
    console.log("df", req.body);
    try {
        let { error } = validationCategory(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        else {
            const name = req.body.name;
            console.log(name);
            const sql = `INSERT INTO category(name) VALUES('${name}')`;
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
}

exports.category = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM register WHERE id = ?`, [id], async (err, response) => {
            if (response) {
                connection.query(`SELECT * FROM category`, async (err, response1) => {
                    if (response1) {
                        res.send(response1);
                    }
                    else {
                        res.send('category Not found!');
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

exports.editData = async (req, res) => {
    try {
        let { error } = validationCategory(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        else {
            const id = req.params.id;
            connection.query(`SELECT * FROM category WHERE id = ?  `, [id], async function (err, params) {
                if (params) {
                    console.log(error);
                    const name = req.body.name;
                    connection.query(`UPDATE category set name='${name}' WHERE id = ?`, [id], async (err, result) => {
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

exports.deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM category WHERE id = ?  `, [id], async function (err, params) {
            if (params) {
                connection.query(`DELETE FROM category   WHERE id = ?`, [id], async function (err, result) {
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


exports.deleteData9 = async (req, res) => {
    try {
        const id = req.body.id;
        // ['1'] = ('1')
        // IN('" + id.join("', '") + "')
        // console.log(id.join("''"));
        connection.query("DELETE FROM category WHERE id IN ('" + id.join("', '") + "')", async function (err, result) {
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
};

