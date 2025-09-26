const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
}, { timestamps: true })

exports.UserModel = mongoose.model("users", schema)
exports.createToken = (user_id) => {
    const token = jwt.sign({ _id: user_id }, process.env.TOKEN_KEY, { expiresIn: "600mins" })
    return token
}

exports.validUser = (_reqBody) => {
    const JoiSchema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(2).max(100).required()
    })

    return JoiSchema.validate(_reqBody)
}

exports.validLogin = (_reqBody) => {
    const JoiSchema = Joi.object({
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(2).max(100).required()
    })

    return JoiSchema.validate(_reqBody)

}
