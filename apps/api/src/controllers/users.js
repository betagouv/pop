// Todo: check rights + log user deletion.
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { capture } = require("./../sentry.js");
require("../passport")(passport);
const User = require("../models/user");

// Get all users.
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const query = {};
  if (req.query.group && req.query.group !== "admin") {
    query.group = req.query.group;
  }
  try {
    users = await User.find(query);
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
  res.status(200).send(users);
});

// Delete one user by her email.
router.delete("/:email", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const email = req.params.email;
    const authenticatedUser = req.user;

    // Only admin can delete accounts.
    if (authenticatedUser.role !== "administrateur") {
      return res.sendStatus(403);
    }

    // User must be in same group (or in admin group) to delete an account.
    groupQuery = {};
    if (authenticatedUser.group !== "admin") {
      groupQuery = { group: authenticatedUser.group };
    }

    // Actually delete the user.
    await User.findOneAndRemove({ email, ...groupQuery });
    return res.status(200).send({ success: true });
  } catch (error) {
    capture(error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
