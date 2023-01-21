const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
  },
  messages: [],
});

userSchema.methods.Messagesave = async function (message) {
  try {
    this.messages = this.messages.concat({ message });
    await this.save();
    return message;
  } catch (error) {
    console.log(error);
  }
};

const users = new mongoose.model("User", userSchema);

module.exports = users;
