const mongoose = require("mongoose")

const signup = mongoose.Schema({
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

const Admin = mongoose.model("Admin" , signup )

module.exports = Admin
