const express = require("express")

const stuSignin = require("../../db/student/signup")
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
  
    const signIn = await stuSignin.findOne({
      password: password,
      userName: userName,
    });
    console.log("--------------------------here my admin details",signIn);
    if (!signIn) {
      return res.status(403).json({
        msg: " user not found in our db ",
      });
    }else{
      res.status(200).json({
        msg: "Login successful!",
        user: {
          id: signIn._id,
          firstName: signIn.firstName,
          lastName: signIn.lastName,
          userName: signIn.userName
        }
      });
    }
  });
  
  module.exports = router;