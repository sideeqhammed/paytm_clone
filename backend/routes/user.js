const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const authmiddleware = require("../middleware");

const router = express.Router();

const SignupBody = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  firstname: z.string(),
  lastname: z.string(),
});

const updateBody = z.object({
  password: z.string().min(6).optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

router.post("/signup", async (req, res) => {
  // safeParse returns an object
  const check = SignupBody.safeParse(req.body);

  if (!check.success) {
    res.status(401).json({
      message: "wrong input",
    });
    console.log(check);
    return;
  }

  const userExists = await User.findOne({
    username: req.body.username,
  });

  if (userExists) {
    res.status(401).json({
      message: "User already exist",
    });
    return;
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  // const token = jwt.sign(
  //   {
  //     userId: user._id,
  //     username: user.username,
  //   },
  //   JWT_SECRET
  // );
  // localStorage.setItem(token, token)

  const userAccount = await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random() * 1000),
  });
  console;

  res.json({
    message: "Signed up successfully",
    // token,
  });
  return;
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await User.findOne({
    username,
    password,
  });

  if (!userExists) {
    return res.status(401).json({
      message: "Username and password does not match",
    });
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
      username: userExists.username,
    },
    JWT_SECRET
  );
  // localStorage.setItem(token, token)

  res.json({
    message: "Signed In",
    token,
  });
});

router.get("/", authmiddleware, async (req, res) => {
  id = req.userId;

  const user = await User.findById(id);
  const account = await Account.findOne({
    userId: id,
  });

  if (user && account) {
    res.json({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      balance: account.balance,
    });
    return;
  } else {
    res.status(403).json({
      message: "User not found",
    });
    return;
  }
});

router.put("/", authmiddleware, async (req, res) => {
  id = req.userId;

  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(401).json({
      message: "invalid input syntax",
    });
  }

  const userExists = await User.findById(id);

  if (!userExists) {
    return res.status(401).json();
  }

  newUser = await User.updateOne(req.body, {
    id: id,
  });

  return res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authmiddleware, async (req, res) => {
  const id = req.userId;

  const filter = req.query.filter || " ";
  const limit = parseInt(req.query.limit) || 5;

  // find users whose firstname or lastname matches the filter (either at the beginning or middle or end) (equivalent to like queries in SQL)
  const findUsers = await User.find({
    $or: [
      {
        username: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        firstname: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastname: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  }).limit(limit);

  // const users = findUsers.map((user) => user.username !== currentuser.username);
  const users = findUsers.filter(
    (user) => user._id.toString() !== id.toString()
  );

  if (!findUsers) {
    res.status(401).json({
      message: "User does not exist",
    });
    return;
  }

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
  return;
});

module.exports = router;
