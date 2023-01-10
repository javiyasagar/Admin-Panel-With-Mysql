const { validationPortfolio } = require('../validation/portfolioValidation');
const connection = require('../middleware/db');
const logger = require('../loggers/logger');
const { JsonWebTokenError } = require('jsonwebtoken');



exports.portfolio = async (req, res) => {
    try {
        connection.query(`SELECT portfolio.projectPortfolio,category.name,portfolio.projectName,portfolio.projectTitle,portfolio.projectUrl,portfolio.projectDate,portfolio.projectImage FROM portfolio INNER JOIN category ON portfolio.projectPortfolio = category.id`, async (err, result) => {
            if (result) {
                res.send(result);
            } else {
                res.send('portfolio is the not connected ');
            }
        });
    } catch (err) {
        logger.error("err", err);
    }
}

exports.addData2 = async (req, res) => {
    try {
        let { error } = validationPortfolio(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        else {
            const projectPortfolio = req.body.projectPortfolio;
            const projectName = req.body.projectName;
            const projectTitle = req.body.projectTitle;
            const projectUrl = req.body.projectUrl;
            const projectDate = req.body.projectDate;
            //JSON.stringify converts array into string
            const projectImage = JSON.stringify(req.files.map(x => x.filename));
            connection.query(`SELECT id FROM category where name = '${projectPortfolio}'`, function (err, result) {
                console.log(err, result)
                if (result.length) {
                    const [results] = result; //destructing
                    const sql = `INSERT INTO portfolio (projectPortfolio, projectName, projectTitle, projectUrl, projectDate, projectImage) VALUES('${results.id}','${projectName}','${projectTitle}','${projectUrl}','${projectDate}','${projectImage}')`;
                    connection.query(sql, (errors, response) => {
                        if (response) {
                            res.send('Data is enter')
                        }
                        else {
                            res.send('portfolio is the edit in database ');
                        }
                    })
                } else {
                    res.send('projectPortfolio category not available')
                }
            })
        }
    }
    catch (err) {
        console.log("ere", err);
    }
};

exports.editData12 = async (req, res) => {
    try {
        let { error } = validationPortfolio(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const id = req.params.id;
        connection.query(`SELECT * FROM portfolio WHERE id = ?  `, [id], async function (err, params) {
            if (params) {
                console.log(error);
                const projectPortfolio = req.body.projectPortfolio;
                const projectName = req.body.projectName;
                const projectTitle = req.body.projectTitle;
                const projectUrl = req.body.projectUrl;
                const projectDate = req.body.projectDate;
                //JSON.stringify converts array into string
                const projectImage = JSON.stringify(req.files.map(x => x.filename));
                connection.query(`UPDATE portfolio set projectPortfolio='${projectPortfolio}',projectName='${projectName}',projectTitle='${projectTitle}',projectUrl='${projectUrl}',projectDate='${projectDate}',projectImage='${projectImage}' WHERE id = ?`, [id], async (err, result) => {
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
    catch (err) {
        console.log(err);
    }
}


exports.deleteData18 = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM portfolio WHERE id = ?  `, [id], async function (err, params) {
            if (params) {
                connection.query(`DELETE FROM portfolio   WHERE id = ?`, [id], async function (err, result) {
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
exports.deleteData124 = async (req, res) => {
    try {
        const id = req.body.id;
        // ['1'] = ('1')
        // IN('" + id.join("', '") + "')
        // console.log(id.join("''"));
        connection.query("DELETE FROM portfolio WHERE id IN ('" + id.join("', '") + "')", async function (err, result) {
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
        logger.error(err)
    }
}


