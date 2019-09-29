const express = require('express'),
router = express.Router();

const authRegister = require('./register'),
authLogin = require('./login'),
authForgot = require('./forgot-password'),
authChangePass = require('./change-password');

router.post("/register", authRegister.Register)
router.post("/login", authLogin.Login)
router.post("/forgotPassword", authForgot.Forgot)
router.post("/changePassword", authChangePass.Change)

module.exports = router;