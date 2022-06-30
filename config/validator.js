const joi = require('joi')

const validator = (req, res, next) => {
    //console.log("req.body es")
    //console.log(req.body)
    const schema = joi.object({
        firstName: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'name: min 3 characters',
                'string.max': 'name: max 20 characters'
            }),
        lastName: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': '"last name": min 3 characters',
                'string.max': '"last name": max 20 characters'
            }),
        email: joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                'string.email': '"mail": incorrect format'
            }),
        country: joi.string()
            // .min()
            // .trim()
            .required(),

        imgProfile: joi.string()
            // .min(10)
            // .trim()
            .required(),

        password: joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': '"password": min 8 characters',
                'string.max': '"password": max 30 characters'
            }),

        // role: joi.string()
        //     .required(),
        from: joi.string()

    })
    const validation = schema.validate(req.body.userData, { abortEarly: false })
    if (validation.error) {
        return res.json({ success: false, from: 'validator', message: validation.error.details, test: validation })
    }
    next()
}

module.exports = validator