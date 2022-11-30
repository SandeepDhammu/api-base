import user from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "../providers/smtp.js";

const secret = "erqjlRUjsjYW2WSq7LzqShBOYngQZPz8";
const set = (model, entity) => {
  if (model.firstName) {
    entity.firstName = model.firstName;
  }
  if (model.lastName) {
    entity.lastName = model.lastName;
  }
  if (model.mobile) {
    entity.mobile = model.mobile;
  }
  if (model.imgUrl) {
    entity.imgUrl = model.imgUrl;
  }
  if (model.country) {
    entity.country = model.country;
  }
  if (model.state) {
    entity.state = model.state;
  }
  return entity;
};

export const signUp = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email) throw "email required!";
    if (!password) throw "password required!";

    let entity = await user.findOne({ email });
    if (entity) throw "User already register with this email";

    entity = await new user(req.body).save();
    entity.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return res.data(await entity.save());
  } catch (err) {
    return res.failure(err);
  }
};

export const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email) throw "email required!";
    if (!password) throw "password required!";

    let entity = await user.findOne({ email });
    if (!entity) throw "user doesn't exist!";

    if (!bcrypt.compareSync(password, entity.password))
      throw "Email or password is incorrect!";

    let claims = { user: entity.id };

    entity.accessToken = jwt.sign(claims, secret, {
      expiresIn: "8450h",
    });

    return res.data(await entity.save());
  } catch (err) {
    return res.failure(err);
  }
};

export const update = async (req, res) => {
  try {
    let entity = await user.findById(req.params.id);
    if (!entity) throw "user doesn't exist";
    set(req.body, entity);
    return res.data(await entity.save());
  } catch (err) {
    return res.failure(err);
  }
};

export const search = async (req, res) => {
  try {
    let where = {};
    if (req.query.search) {
      // if query
    }
    let items = await user.find(where).sort();
    return res.page(items);
  } catch (error) {
    res.failure(error);
  }
};

export const getById = async (req, res) => {
  try {
    let entity = await user.findById(req.params.id);
    if (!entity) throw "User doesn't exist!";
    return res.data(entity);
  } catch (err) {
    return res.failure(err);
  }
};

export const remove = async (req, res) => {
  try {
    let entity = await user.findById(req.params.id);
    if (!entity) throw "User doesn't exist!";
    return res.success("user removed succesfully!");
  } catch (err) {
    return res.failure(err);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    let entity = await user.findOne({ email: req.body.email });
    if (!entity) {
      return res.failure("Please enter registered email address");
    }
    let link = `http://localhost:4200/auth/reset-password/${entity._id}`;
    await sendMail(entity.email, link);
    return res.success("OTP Sent Successfully on your Email");
  } catch (err) {
    return res.failure(err);
  }
};

export const resetPassword = async (req, res) => {
  try {
    let entity = await user.findById(req.params.id);
    if (!entity) throw "User not found";
    entity.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    await entity.save();
    return res.success("Password updated");
  } catch (error) {
    return res.failure(error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    let entity = await user.findById(req.params.id);
    if (!entity) throw "User not found";

    if (!bcrypt.compareSync(req.body.oldPassword, entity.password))
      throw "Old password is incorrect";
    entity.password = bcrypt.hashSync(
      req.body.newPassword,
      bcrypt.genSaltSync(10)
    );
    await entity.save();
    return res.success("New Password updated");
  } catch (err) {
    return res.failure(err);
  }
};
