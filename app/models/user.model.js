const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    country: String,
    organizationType: String,
    INN: String,
    surname: String,
    firstName: String,
    secondName: String,
    telNumber: String,
    email: String,
    shopName: String,
    productCategory: String,
    bankAccount: String,
    bankBIK: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;