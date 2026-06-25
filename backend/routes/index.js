const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

// create a new router
const router = express.Router();

// route all api that goes to /api/v1/user to userRouter
router.use("/user", userRouter);

// route all api that goes to /api/v1/account to accountRouter
router.use("/account", accountRouter);

// router1.get("/", function (req, res, next) {
//   console.log("router working");
// });

module.exports = router;
