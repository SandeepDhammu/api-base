import mongoose from "mongoose";

let user = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  country: String,
  state: String,
  password: String,
  imgUrl: String,
  accessToken:String,
});

user = mongoose.model("user", user);

export default user;
