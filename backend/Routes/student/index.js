const express = require("express")

const router = express.Router()
const stuSignUpApi = require("./signup")
const stuSignInApi = require("./login")

router.use("/student" , stuSignUpApi)
router.use("/student" , stuSignInApi)

module.exports = router