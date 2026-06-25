const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "You have to signup first",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;

      next();
    } else {
      return res.status(403).json({
        message: "Bad token",
      });
    }
  } catch (err) {
    return res.status(403).json({
      message: "Token expired, signin",
    });
  }

  // const token = localStorage.getItem("token");

  // if (!token) {
  //   res.json({
  //     message: "You have to signin first",
  //   });
  //   return;
  // }

  // const decode = jwt.verify(token, JWT_SECRET);

  // // if (!decode) {
  // //   res.json({
  // //     message: "Token expired, signin",
  // //   });
  // //   return;
  // // }

  // if (decode !== req.userId) {
  //   return res.json({
  //     message: "Token expired, signin",
  //   });
  // }
  // next();
};

module.exports = authmiddleware;
