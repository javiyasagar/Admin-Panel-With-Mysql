const Joi = require('@hapi/joi');

function validationTestimonial(testimonial1) {
    const schema = Joi.object({
        testimonialName: Joi.string().empty().required().messages({
            "string.base": `testimonialName should be a type of 'text'`,
            "string.empty": `testimonialName cannot be an empty field`,
            "any.required": `testimonialName is a required field`,
        }),
        designation: Joi.string().empty().required().messages({
            "string.base": `designation should be a type of 'text'`,
            "string.empty": `designation cannot be an empty field`,
            "string.designation": `designation format not valid`,
            "any.required": `designation is a required field`,
        }),
        description: Joi.string().empty().required().messages({
            "string.base": `description should be a type of text`,
            "string.empty": 'description is not allowed to be empty',
            "string.required": `description is Required`,

        }),
        image: Joi.optional()

    })
    return schema.validate(testimonial1);
}

module.exports = {
    validationTestimonial
}


