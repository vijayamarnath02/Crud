const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {type:String, default:""},
  age:{type: Number, default: 0},
  phno:{type: Number, default: 0},
  age:{type: Number, default: 0},
  dob:{type: String, default: ""},
  email:{type: String, default: ""},
});

const User = mongoose.model("details", UserSchema);

module.exports = User;