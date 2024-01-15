const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/createError");

const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      // username: req.body.username,
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      //  return res.status(404).send("User not found")
      return next(createError(404, "User not found!"));
    }
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      // return res.status(400).send("Username or password are not correct")
      return next(createError(404, "Username or password are not correct"));
    }
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
    // res.status(200).send(info)
  } catch (err) {
     next(createError(err))
  }
};
const logout = (req, res) => {
res.clearCookie("accessToken", {
  sameSite:"none",
  secure:true
}).status(200).send("User has been logged out")
};

module.exports = {
  register,
  login,
  logout,
};
