const express = require("express");
const router = express.Router();
const passport = require("passport");
const { capture } = require("./../sentry.js");
require("../passport")(passport);
const User = require("../models/user");

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const query = {};
  if (req.query.group && req.query.group !== "admin") {
    query.group = req.query.group;
  }
  try {
    users = await User.find(query);
  } catch (e) {
    capture(e);
    return res.status(500).send({ e });
  }
  res.status(200).send(users);
});

router.delete("/:email", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const email = req.params.email;
    await User.findOneAndRemove({ email });
    return res.status(200).send({});
  } catch (error) {
    capture(error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
