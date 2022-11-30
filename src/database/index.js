import mongoose from "mongoose";
const host =
  "mongodb+srv://sandeep_07:s%40moo5599@cluster0.9p1yj2a.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
  mongoose
    .connect(host, {})
    .then(() => console.log("database connected"))
    .catch((err) => console.log("Connection failed:" + err));
};

export default connect;
