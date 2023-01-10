const Joi = require('@hapi/joi');

function validationContactUs(contactUs) {
    const schema = Joi.object({
        name: Joi.string().required().empty().messages({
            "string.base": `name should be a type of 'text'`,
            "string.empty": `name cannot be an empty field`,
            "any.required": `name is a required field`,
        }),
        email: Joi.string().required().empty().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.Email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        phoneNumber: Joi.string().pattern(/^[0-9]+$/).length(10).empty().required().label("Phone No").messages({
            "string.base": `phone number should be a type of text`,
            "string.pattern.base": `Enter only numbers`,
            "string.empty": 'phone number is not allowed to be empty',
            "string.required": `phone number is Required`,

        }),
        message: Joi.string().empty().required().messages({
            "string.empty": `message cannot be an empty field`,
            "string.message": `message format not valid`,
            "any.required": `message is a required field`,
        }),

        date: Joi.string().empty().required().messages({
            "string.empty": `date cannot be an empty field`,
            "string.date": `date format not valid`,
            "any.required": `date is a required field`,
        }),

    })
    return schema.validate(contactUs);
}
module.exports = {
    validationContactUs,
}
