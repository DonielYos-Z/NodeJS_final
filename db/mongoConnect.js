const mongoose = require('mongoose')
require("dotenv").config()
main().catch(err => console.log(err))

console.log(process.env.MONGO_DB)

async function main() {
    await mongoose.connect(process.env.MONGO_DB)
    console.log("mongo connect summer_final atlas")
}