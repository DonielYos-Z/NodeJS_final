const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    price: Number,
    ml: Number,
    img_url: String
})

// model - בנוי משם הקולקשן והסכמה שלו
exports.DrinkModel = mongoose.model("drinks", schema)
