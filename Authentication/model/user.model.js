import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requires: true,
    unique: true,
  },
  userpassword: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;