const express = require("express")
const { CarModel, validateCar } = require("../models/carModel")
const { auth } = require("../middlewares/auth")
// מייצר משתנה ראוטר
const router = express.Router()

// הגדרת הכתובת ביחס להגדרת הראוט של הראוטר
router.get("/", async (req, res) => {
    const max = req.query.max || 2025
    const min = req.query.min || 1900
    const skip = req.query.skip || 0
    try {
        const data = await CarModel.find({ year: { $gte: min, $lte: max } }).limit(5).skip(skip)
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })
    }
})
// יחזיר את כמות הרשומות שיש בקולקשן 
router.get("/count", async (req, res) => {
    try {
        const count = await CarModel.countDocuments({})
        res.json({ count })
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })
    }
})

// auth -> פונקציית מידל וואר שבודקת שלמשתמש יש טוקן
// שנשלח
router.post("/", auth, async (req, res) => {
    const validBody = validateCar(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }

    try {
        const car = new CarModel(req.body)
        // מוסיף לרשומה תיעוד את האיי די של המשתמש 
        // שהוסיף אותה
        // req.tokenData -> מגיע מפונקציית אוט
        car.user_id = req.tokenData._id
        await car.save()
        res.json(car)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        // user_id:req.tokenData._id -> דואג שמשתמש יוכל למחוק רק את 
        // הרשומות שהוא הוסיף בעבר
        const data = await CarModel.deleteOne({ _id: id, user_id: req.tokenData._id })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })
    }
})
router.put("/:id", auth, async (req, res) => {
    const validBody = validateCar(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }

    try {
        const id = req.params.id
        const data = await CarModel.updateOne({ _id: id, user_id: req.tokenData._id }, req.body)
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })
    }
})

// export default
module.exports = router