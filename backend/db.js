const mongoose = require("mongoose");

// connect to mongoose database
mongoose.connect("mongodb://localhost:27017/paytm?replicaSet=rs0");

const { Schema } = mongoose;

// create user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const accountSchema = new mongoose.Schema({
  // refrences the user in the user schema above
  userId: {
    type: mongoose.Schema.Types.ObjectId, // the type of userschema
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// create user model
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
