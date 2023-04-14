const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");
const bcrypt = require("bcryptjs");
const User = require("../users/user-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJWT) => {
      if (err) {
        next({
          status: 401,
          message: "Invalid token",
        });
      } else {
        req.userInfo = decodedJWT;
        next();
      }
    });
  } else {
    next({ status: 401, message: "No token" });
  }
};

const payLoadCheck = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "Fill in the name, email and password fields" });
    } else {
      req.encPassword = await bcrypt.hash(req.body.password, 8);
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkNameEmail = async function (req, res, next) {
  try {
    const { name, email } = req.body;
    let nameControl = await User.findByFilter({ name: name });
    let emailControl = await User.findByFilter({ email: email });
    if (nameControl) {
      res.status(401).json({
        message: "Username already taken, try new username",
      });
    } else if (emailControl) {
      res.status(401).json({
        message: "Already logged in with email address",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const passwordCheck = async function (req, res, next) {
  try {
    let user = await User.findByFilter({
      name: req.body.name,
    });
    if (!user) {
      next({
        status: 401,
        message: "invalid criteria",
      });
    } else {
      const { password } = req.body;
      let isTruePassword = bcrypt.compareSync(password, user.password);
      if (!isTruePassword) {
        next({
          status: 401,
          message: "invalid criteria",
        });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
const payLoadCheckLogin = async function (req, res, next) {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      res.status(400).json({ message: "Fill in the Name, password fields" });
    } else {
      req.encPassword = await bcrypt.hash(req.body.password, 8);
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  restricted,
  payLoadCheck,
  checkNameEmail,
  passwordCheck,
  payLoadCheckLogin,
};
