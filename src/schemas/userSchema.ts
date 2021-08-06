import Joi from 'joi'

const signUp = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref("password")
})

export default {signUp}