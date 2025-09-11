const mongoose = require("mongoose");
const Joi = require("joi");

const toySchema = new mongoose.Schema({
  name: String,
  info: String,
  category: String,
  img_url: String,
  price: Number,
  user_id: String
}, { timestamps: true });

exports.ToyModel = mongoose.model("toys", toySchema);

exports.validToy = (_reqBody) => {
  const JoiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    info: Joi.string().min(2).max(500).required(),
    category: Joi.string().min(2).max(100).required(),
    img_url: Joi.string().min(2).max(500).allow(null, ""),
    price: Joi.number().min(1).max(999).required()
  });

  return JoiSchema.validate(_reqBody);
};
