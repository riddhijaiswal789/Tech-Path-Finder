const mongoose = require("mongoose")

const stuSignup = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim : true
  },
  lastName: {
    type : String ,
    required : true ,
    trim : true 
  },
  password: {
    type : String , 
    required : true ,
  },
  userName :{
    type : String ,
    required : true ,
  }
});

const Student = mongoose.model("Student" , stuSignup );

module.exports = Student