const { validationTestimonial } = require('../validation/testimonialValidation');
const connection = require('../middleware/db');
const logger = require('../loggers/logger');



exports.addData3 = async (req, res) => {
    console.log("df", req.body);
    try {
        let { error } = validationTestimonial(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        else {
            const testimonialName = req.body.testimonialName;
            const designation = req.body.designation;
            const description = req.body.description;
            const image = req.file.filename;
            const UPl2 = `INSERT INTO testimonial(testimonialName,designation,description,image) VALUES('${testimonialName}','${designation}','${description}','${image}')`;
            connection.query(UPl2, (err, result) => {
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

exports.testimonial = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM register WHERE id = ?`, [id], async (err, params) => {
            if (params) {
                connection.query(`SELECT * FROM testimonial`, async (err, response1) => {
                    if (response1) {
                        res.send(response1);
                    } else {
                        res.send('Categories Not found!');
                    }
                });
            } else {
                res.send('Not valid email!');
            }
        });
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.editData5 = async (req, res) => {
    try {
        let { error } = validationTestimonial(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        else {
            const id = req.params.id;
            connection.query(`SELECT * FROM testimonial WHERE id = ?  `, [id], async function (err, params) {
                if (params) {
                    console.log(error);
                    const testimonialName = req.body.testimonialName;
                    const designation = req.body.designation;
                    const description = req.body.description;
                    const image = req.file.filename;
                    connection.query(`UPDATE testimonial set testimonialName='${testimonialName}',designation='${designation}',description='${description}',image='${image}' WHERE id = ?`, [id], async (err, result) => {
                        console.log(err);
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
};

exports.deleteData7 = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM testimonial WHERE id = ?  `, [id], async function (err, params) {
            if (params) {
                connection.query(`DELETE FROM testimonial   WHERE id = ?`, [id], async function (err, result) {
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
};


exports.deleteData0014 = async (req, res) => {
    try {
        const id = req.body.id;
        // ['1'] = ('1')
        // IN('" + id.join("', '") + "')
        // console.log(id.join("''"));
        connection.query("DELETE FROM testimonial WHERE id IN ('" + id.join("', '") + "')", async function (err, result) {
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









