const express = require("express");
const router = express.Router();
const User = require("../models/model");

// Create a new user with a name and optionally assign a parent user
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

// Distribute earnings based on the specified rules
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

// Function to distribute earnings according to MLM rules and distribute to all parent users
async function distributeEarnings(user, amount) {
  const distribution = {};
  let remainingAmount = amount;

  let currentUser = user;
  console.log("user",user);

  while (currentUser) {
    let percentage;

    if (currentUser.level === user.level) {
      percentage = 0.6; // 40% for the user's level
    } else if (currentUser.level === user.level - 1) {
      percentage = 0.2; // 20% for the parent
    } else if (currentUser.level === user.level - 2) {
      percentage = 0.1; // 10% for the grandparent
    } else if (currentUser.level === user.level - 3) {
      percentage = 0.05; // 5% for the great-grandparent
    } else {
      percentage = 0.01; // 1% other levels
    }

    const distributedAmount = remainingAmount * percentage;
    distribution[`Level ${currentUser.level}`] = distributedAmount;
    console.log(distributedAmount);
    currentUser.earnings += distributedAmount;
    await currentUser.save();
    console.log(distributedAmount);
    console.log(currentUser);

    // Distribute earnings to parent if available
    if (currentUser.parent) {
      const parent = await User.findById(currentUser.parent);
      if (parent) {
        remainingAmount -= distributedAmount;
        currentUser = parent;
      } else {
        currentUser = null; // Break the loop if parent user not found
      }
    } else {
      currentUser = null; // Break the loop if no parent
    }
  }

  return distribution;
}



module.exports = router;
