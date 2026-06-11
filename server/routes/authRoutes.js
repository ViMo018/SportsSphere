const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;

//JWT_SECRET is a  guard’s private stamp/signature key
//JWT token  is a student’s entry pass / ID card
//User       is a actual student
// workflow
/*
Login:
email + password
↓
backend checks password
↓
backend creates token using JWT_SECRET
↓
frontend stores token


Protected route:
frontend sends token
↓
backend verifies token using JWT_SECRET
↓
backend allows/denies request
*/
