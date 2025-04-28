const express = require("express")

const adSignin = require("../../db/admin/signup")
const zod = require("zod")

const router = express.Router();

const signinBody = zod.object({
    password: zod.string().min(6),
    userName: zod.string().email(),
  });
  
  router.post("/signin", async (req, res) => {
    const success = signinBody.safeParse(req.body);
  
    if (!success) {
      return res.status(403).json({
        msg: "inputs are not valid ",
      });
    }
    const password = req.body.password
    const userName = req.body.userName
  
    const signIn = await adSignin.findOne({
      password: password,
      userName: userName,
    });
    console.log("--------------------------here my admin details",signIn);
    if (!signIn) {
      return res.status(403).json({
        msg: " user not found in our db ",
      });
    }else{
        res.json({
            msg : "success",
          })
    }
  });
  
  module.exports = router;