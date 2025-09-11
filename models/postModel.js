const mongoose = require("mongoose")
const Joi = require("joi")

const schema = new mongoose.Schema({
    title: String,
    info: String
    // {timestamps:true} - יוסיף אוטומטית תאריך
    // יצירה ועריכה לרשומה
}, { timestamps: true })

exports.PostModel = mongoose.model("posts", schema)

exports.validPost = (_reqBody) => {
    const JoiSchema = Joi.object({
        title: Joi.string().min(2).max(150).required(),
        info: Joi.string().min(2).max(500).required()
    })
    return JoiSchema.validate(_reqBody)
}