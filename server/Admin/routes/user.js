const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';



// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Token payload
    const payload = { userId: user._id, email: user.email };

    // Sign the token with an expiration time
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: { _id: user._id, name: user.name, email: user.email, image: user.image, phone: user.phone }
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

    




//  User Register.
router.post("/register", async (req, res) => {
  try {
    const { name, email, address, phone, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ramiro46@ethereal.email",
        pass: "xjeaSBjzbZC4pm9AjN",
      },
    });

    var mailOptions = {
      from: "amaanrc11@gmail.com",
      to: user.email,
      subject: "Account Registered",
      text: "Your account has been registered successfully in Shop Mart Lanka Platform",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// User Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "User logged out successfully" });
});

// Check if User is Logged In
router.get("/check", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});



// Get all users
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json({ success: true, users: users });
  } 
  catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Get a specific user by ID
router.get("/getUserById/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user: user });
  } 
  catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const olduser = await User.findOne({ email });
//     if (!olduser) {
//       return res.json({ message: "User Not Exists" });
//     }
//     const secret = process.env.JWT_SECERT_KEY + olduser.password;
//     const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, {
//       expiresIn: "5m",
//     });
//     const link = `http://localhost:5000/api/user/reset-password/${olduser._id}/${token}`;
//     console.log(link);
//     const transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       auth: {
//         user: "westley.mosciski@ethereal.email",
//         pass: "mf3aRurpWy3zwP5N5F",
//       },
//     });

//     var mailOptions = {
//       from: "insafinh@gmail.com",
//       to: olduser.email,
//       subject: "Reset Password link",
//       text: link,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });










// router.get("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = process.env.JWT_SECERT_KEY + oldUser.password;

//   try {
//     const verify = jwt.verify(token, secret);
//     res.render("index", { email: verify.email, status: "Verified" });
//   } catch (error) {
//     res.send("Not Verified");
//   }
// });

// router.post("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   const oldUser = await User.findOne({ _id: id });

//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!" });
//   }

//   const secret = process.env.JWT_SECERT_KEY + oldUser.password;

//   try {
//     const verify = jwt.verify(token, secret);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.updateOne(
//       {
//         _id: id,
//       },
//       {
//         $set: {
//           password: hashedPassword,
//         },
//       }
//     );

//     res.render("index", { email: verify.email, status: "verified" });
//   } catch (error) {
//     console.log(error);
//     res.render("index", { status: "Something Went Wrong!" });
//   }
// });

module.exports = router;
