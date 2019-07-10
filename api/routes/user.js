const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/user");
const User = require("./../models/user");
//signup login
router.post("/signup",UserController.user_signup);
//login user
router.post("/login", UserController.user_login);

//remove user
router.delete('/:userId',UserController.user_delete);

module.exports = router;