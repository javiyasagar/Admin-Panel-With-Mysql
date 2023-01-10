const Joi = require('@hapi/joi');

function validationCategory(category) {
    const schema = Joi.object({
        name: Joi.string().empty().required().messages({
            "string.base": `name should be a type of 'text'`,
            "string.empty": `name cannot be an empty field`,
            "any.required": `name is a required field`,
        }),
    })
    return schema.validate(category);
}


module.exports = {
    validationCategory,

}
