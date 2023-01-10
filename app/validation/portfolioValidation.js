const Joi = require('@hapi/joi');


function validationPortfolio(Portfolio12) {
    const schema = Joi.object({
        projectPortfolio: Joi.string().empty().required().messages({
            "string.base": `projectPortfolio should be a type of 'text'`,
            "string.empty": `projectPortfolio cannot be an empty field`,
            "any.required": `projectPortfolio is a required field`,
        }),
        projectName: Joi.string().empty().required().messages({
            "string.base": `projectName should be a type of 'text'`,
            "string.empty": `projectName cannot be an empty field`,
            "string.designation": `projectName format not valid`,
            "any.required": `projectName is a required field`,
        }),
        projectTitle: Joi.string().empty().required().messages({
            "string.base": `projectTitle should be a type of text`,
            "string.empty": 'projectTitle is not allowed to be empty',
            "string.required": `projectTitle is Required`,
        }),
        projectUrl: Joi.string().empty().required().messages({
            "string.base": `projectUrl should be a type of text`,
            "string.empty": 'projectUrl is not allowed to be empty',
            "string.required": `projectUrl is Required`,
        }),
        projectDate: Joi.string().empty().required().messages({
            "string.base": `projectDate should be a type of text`,
            "string.empty": 'projectDate is not allowed to be empty',
            "string.required": `projectDate is Required`,
        }),
        projectImage: Joi.optional()

    })
    return schema.validate(Portfolio12);
}





module.exports = {
    validationPortfolio
}

