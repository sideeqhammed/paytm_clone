const express = require("express");
const mongoose = require("mongoose");
const authmiddleware = require("../middleware");
const { Account } = require("../db");
const z = require("zod");

const router = express.Router();

const transactionBody = z.object({
  to: z.string(),
  amount: z.number(),
});

router.get("/balance", authmiddleware, async (req, res) => {
  const userId = req.userId;

  const account = await Account.findOne({
    userId,
  });

  return res.json({
    accountBalance: account.balance,
  });
});

router.post("/transfer", authmiddleware, async (req, res) => {
  const check = transactionBody.safeParse(req.body);

  if (!check.success) {
    return res.json({
      message: "Invalid input",
    });
  }

  // Client session: Ensures only one thread executes at a time, used to make sure either all of the code below runs successfully or none runs
  const session = await mongoose.startSession();

  // starts the transaction
  session.startTransaction();

  const { to, amount } = req.body;

  const fromAccount = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!fromAccount || !fromAccount.balance > amount) {
    // aborts the transaction
    await session.abortTransaction();
    return res.json({
      message: "",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.json({
      message: "Recipient does not exist",
    });
  }

  const updatefromAccount = await Account.findOneAndUpdate(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  const updateToAccount = await Account.findOneAndUpdate(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  // finish transaction
  await session.commitTransaction();

  res.json({
    message: "Transaction successful",
  });
});

module.exports = router;
