const Joi = require('@hapi/joi');

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().empty().required().messages({
            "string.base": `first name should be a type of 'text'`,
            "string.empty": `first name cannot be an empty field`,
            "any.required": `first name is a required field`,
        }),
        email: Joi.string().empty().email().required().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        phoneNo: Joi.string().pattern(/^[0-9]+$/).length(10).empty().required().label("Phone No").messages({
            "string.base": `Phone Number should be a type of text`,
            "string.pattern.base": `Enter only Numbers`,
            "string.empty": 'Phone Number is not allowed to be empty',
            "string.required": `Phone Number is Required`,

        }),
        gender: Joi.string().empty().required().messages({
            "string.empty": `Gender cannot be an empty field`,
            "string.Gender": `Gender format not valid`,
            "any.required": `Gender is a required field`,
        }),

        password: Joi.string().empty().required().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password can be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        }),

        city: Joi.string().empty().required().messages({
            "string.empty": `City cannot be an empty field`,
            "string.City": `City format not valid`,
            "any.required": `City is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "string.empty": `Hobby cannot be an empty field`,
            "any.required": `Hobby is a required field`
        }),

        Image: Joi.optional()

    });

    return schema.validate(user);
}

function loginUsers(users) {
    const schema = Joi.object({
        email: Joi.string().empty().email().required().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`
        }),
        password: Joi.string().empty().min(6).max(16).required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password can be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
    })
    return schema.validate(users);

}


function passwordValidat(coures) {
    const schema = Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        })
    })
    return schema.validate(coures);
}

function otpValidate(coures) {
    const schema = Joi.object({
        otp: Joi.string().required().empty().messages({
            "string.base": `OTP should be a type of 'text'`,
            "string.empty": `OTP cannot be an empty field`,
            "any.required": `OTP is a required field`,
        })
    })
    return schema.validate(coures);
}

function newPasswordValidat(courses) {
    const schema = Joi.object({
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password can be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
    return schema.validate(courses);

}

function resetpValidat(Use) {
    const schema = Joi.object({
        currentPassword: Joi.string().empty().required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `currentPassword is a required field`,
        }),
        newpassword: Joi.string().empty().min(6).max(16).required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password can be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        confirmPassword: Joi.string().empty().valid(Joi.ref('Password')).required().messages({
            "string.base": `confirm password should be a type of 'text'`,
            "string.empty": `confirm password cannot be an empty field`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
    return schema.validate(Use);
}

function profileValidate(vc) {
    const schema = Joi.object({
        name: Joi.string().required().empty().messages({
            "string.base": `Username should be a type of 'text'`,
            "string.empty": `Username cannot be an empty field`,
            "any.required": `Username is a required field`,
        }),
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.Email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        phoneNo: Joi.string().pattern(/^[0-9]+$/).length(10).empty().required().label("Phone No").messages({
            "string.base": `Phone Number should be a type of text`,
            "string.pattern.base": `Enter only Numbers`,
            "string.empty": 'Phone Number is not allowed to be empty',
            "string.required": `Phone Number is Required`,

        }),
        gender: Joi.string().empty().required().messages({
            "string.empty": `Gender cannot be an empty field`,
            "string.Gender": `Gender format not valid`,
            "any.required": `Gender is a required field`,
        }),

        city: Joi.string().empty().required().messages({
            "string.empty": `City cannot be an empty field`,
            "string.City": `City format not valid`,
            "any.required": `City is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "string.empty": `Hobby cannot be an empty field`,
            "any.required": `Hobby is a required field`
        }),

        Image: Joi.optional()


    })
    return schema.validate(vc);
}






module.exports = {
    validateUser,
    loginUsers,
    passwordValidat,
    otpValidate,
    newPasswordValidat,
    resetpValidat,
    profileValidate,

}