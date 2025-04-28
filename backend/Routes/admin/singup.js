const express = require("express")

const Admin = require("../../db/admin/signup")
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

  const existingAdmin = await Admin.findOne({ userName: req.body.userName });
  if (existingAdmin) {
    return res.status(400).json({ msg: "Admin already exists" });
  }

  const admin = await Admin.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    userName: req.body.userName,
  });
  
  if(!admin){
    return res.send("not created")
  }

  const adminId = admin._id;
  res.json({
    msg: adminId,
  });
});


module.exports = router;