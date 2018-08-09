const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("../../../db");

const schema = {
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      isAsync: true,
      validator: (v, cb) =>
        cb(validator.isEmail(v), `${v} is not a valid email address`)
    },
    required: "Please Supply an email address"
  },
  created: {
    type: Date,
    default: Date.now
  }
};
const userSchema = new mongoose.Schema(schema);

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  errorMessages: {
    UserExistsError: "Email Already Exists"
  }
});

userSchema.plugin(mongodbErrorHandler);

const User = mongoose.model("user", userSchema);

module.exports = {
  schema,
  User
};
