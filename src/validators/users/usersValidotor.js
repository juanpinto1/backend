const { header, param, body, validationResult } = require('express-validator')

const updateValidator = [
    param('id').notEmpty().withMessage('Debes pasar un ID').isInt().withMessage('Debe ser un entero'),
    (req, res, next) => {

        const errors = validationResult(req).mapped()
        console.log(Object.keys(errors))
        if (Object.keys(errors).length) {
            res.send(errors)
        } else {
            next()
        }

    }
]


const addValidator = [
    body('email').notEmpty().withMessage('Agrega Tu email').isEmail().withMessage('Formato Incorrecto'),
    body('password').notEmpty().withMessage('Agrega el Nombre de usuario'),
    body('username').notEmpty().withMessage('Agrega el Role').isIn(['admin', 'guest', 'customer']).withMessage('Debe ser un rol correcto'),
    body('profile_picture').notEmpty().withMessage('Agrega Tu país'),


    (req, res, next) => {

        const errors = validationResult(req).mapped()

        if (Object.keys(errors).length) {
            res.status(400).send(errors)
        } else {
            next()
        }

    }
]


const UsersValidatorCollection = {
    updateValidator,
    addValidator
}


module.exports = {
    UsersValidatorCollection
}