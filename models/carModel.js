const mongoose = require("mongoose")
const Joi = require("joi")

let schema = new mongoose.Schema({
    company: String,
    color: String,
    year: Number,
    // מאפיין שיכיל את המידע של המשתמש שהוסיף 
    // את הרשומה
    user_id: String
}, { timestamps: true })
exports.CarModel = mongoose.model("cars", schema)

exports.validateCar = (_reqBody) => {
    let joiSchema = Joi.object({
        company: Joi.string().min(2).max(400).required(),
        color: Joi.string().min(2).max(400).required(),
        year: Joi.number().min(1900).max(2050).required(),
    })
    return joiSchema.validate(_reqBody)
}