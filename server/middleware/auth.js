const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const smtp = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, u) => {
    if (err)
      return res.status(400).json({ error: "Email address already exists !" });
    res
      .status(400)
      .json({ message: "Signedup success...Verify your email address!" });
  });
  const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  smtp.sendMail(
    {
      from: process.env.USER,
      to: req.body.email,
      subject: "Confirmation@aeroclubmnnit",
      html: `<h2>You requested for password reset</h2>
      <p>Click on this <a href="http://localhost:3000/user/confirm/${jwtToken}">link</a> to verify<p>`,
    },
    (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

exports.confirm = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(422).json({ error: err });
    const { _id } = payload;
    User.findById(_id).then((user) => {
      if (user.confirmed)
        return res.json({ error: "User already confirmed !" });

      if (!user) return res.json({ error: "User does not exists !" });
      user.confirmed = true;
      user.save().then((savedUser) => {
        return res.json({ message: "User Confirmed successfully !" });
      });
    });
  });
};

exports.Adminlogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email or password do not match !",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email or password do not match !",
      });
    }

    res.json({ role: user.role, message: "Admin loggedIn successfully !" });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email or password do not match !",
      });
    }

    if (!user.confirmed)
      return res.status(400).json({
        error: "You need to verify your email before login !",
      });

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email or password do not match !",
      });
    }

    // create jwt token
    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // put token in cookie
    res.cookie("token", jwtToken, { expire: new Date() + 9999 });
    res.json({ token: jwtToken, message: "LoggedIn Successfully !" });
  });
};

exports.forgetPassword = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user)
      return res.status(422).json({ error: "Email is not registered !" });

    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.reset_pass_session = true;
    user.save().then((u) => {
      // nodemailer
      smtp.sendMail(
        {
          from: process.env.USER,
          to: req.body.email,
          subject: "Password-Reset@aeroclubmnnit",
          html: `<h2>You requested for password reset</h2>
        <p>Click on this <a href="http://localhost:3000/user/resetpassword/${jwtToken}">link</a> to reset password<p>`,
        },
        (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent: " + info.response);
            res.json({ message: "Checkout your registered email !" });
          }
        }
      );
    });
  });
};

exports.resetPassword = (req, res) => {
  const newPassword = req.body.password;
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(422).json({ error: err });
    const { _id } = payload;
    User.findById(_id).then((user) => {
      if (!user) return res.json({ error: "User does not exists !" });
      user.password = newPassword;
      user.reset_pass_session = false;
      user.save().then((savedUser) => {
        return res.json({ message: "Password updated successfully !" });
      });
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully !",
  });
};

//custom middlewares
exports.isSignedIn = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "You must be logged in !" });
  const token = authorization.replace("Bearer ", "");

  // verifying jwt token
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: "You must be logged in !" });
    const { _id } = payload;

    // finding the user with the id
    User.findById(_id).then((user) => {
      req.user = user;
      next();
    });
  });
};

exports.resetVerify = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    const { _id } = payload;

    User.findById(_id).then((user) => {
      if (!user.reset_pass_session)
        return res
          .status(422)
          .json({ error: "Session has expired...try again !" });
      next();
    });
  });
};

exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};