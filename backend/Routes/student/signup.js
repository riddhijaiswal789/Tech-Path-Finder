const express = require("express")

const stuSignup = require("../../db/student/signup")
const zod = require("zod")

const router = express.Router();

const signupBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
  userName: zod.string().email(),
});

router.post("/signup", async (req, res) => {
  
  const validation = signupBody.safeParse(req.body);

  if (!validation.success) {
    return res.status(403).json({
      msg: " Inputs are not valid ",
    });
  }

  const existingStudent = await stuSignup.findOne({ userName: req.body.userName });
  if (existingStudent) {
    return res.status(400).json({ msg: "Admin already exists" });
  }

  const student = await stuSignup.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    userName: req.body.userName,
  });
  
  if(!student){
    return res.send("not created")
  }

  const studentId = student._id;
  res.json({
    msg: studentId,
  });
});


module.exports = router;