const express = require("express")

const router = express.Router()
const adSignUpApi = require("./singup")
const adSignInApi = require("./login")

router.use("/admin" , adSignUpApi)
router.use("/admin" , adSignInApi)

module.exports = router