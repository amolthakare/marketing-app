const express = require("express");
const router = express.Router();
const User = require("../models/model");

router.post("/users", async (req, res) => {
  try {
    const { name, parentId } = req.body;
    let parentLevel = 0;
    if (parentId) {
      const parent = await User.findById(parentId);
      if (!parent) {
        return res.status(404).json({ message: "Parent user not found" });
      }
      parentLevel = parent.level;
    }
    const userLevel = parentId ? parentLevel + 1 : 0;

    const user = new User({ name, parent: parentId, level: userLevel });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/distribute", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const distribution = distributeEarnings(user, amount);
    res.status(200).json(distribution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
});

async function distributeEarnings(user, amount) {
  const distribution = {};
  let remainingAmount = amount;

  let currentUser = user;
  console.log("user",user);

  while (currentUser) {
    let percentage;

    if (currentUser.level === user.level) {
      percentage = 0.6;
    } else if (currentUser.level === user.level - 1) {
      percentage = 0.2;
    } else if (currentUser.level === user.level - 2) {
      percentage = 0.1;
    } else if (currentUser.level === user.level - 3) {
      percentage = 0.05;
    } else {
      percentage = 0.01;
    }

    const distributedAmount = remainingAmount * percentage;
    distribution[`Level ${currentUser.level}`] = distributedAmount;
    console.log(distributedAmount);
    currentUser.earnings += distributedAmount;
    await currentUser.save();
    console.log(distributedAmount);
    console.log(currentUser);

    if (currentUser.parent) {
      const parent = await User.findById(currentUser.parent);
      if (parent) {
        remainingAmount -= distributedAmount;
        currentUser = parent;
      } else {
        currentUser = null;
      }
    } else {
      currentUser = null; 
    }
  }

  return distribution;
}



module.exports = router;
