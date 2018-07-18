const crypto = require("crypto");
const mongoose = require("../../../db");

const schema = {
  local: {
    firstName: String,
    lastName: String,
    email: String,
    hashedPassword: String,
    salt: String
  },
  created: {
    type: Date,
    default: Date.now
  }
};
const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods = {
  encryptPassword(password) {
    return crypto
      .createHmac("sha1", this.local.salt)
      .update(password)
      .digest("hex");
  },
  checkPassword(password) {
    return this.encryptPassword(password) === this.local.hashedPassword;
  }
};

userSchema
  .virtual("local.password")
  .set(function(password) {
    this._plainPassword = password;
    this.local.salt = `${Math.random()}`;
    this.local.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._plainPassword;
  });

const User = mongoose.model("user", userSchema);

module.exports = {
  schema,
  User
};
