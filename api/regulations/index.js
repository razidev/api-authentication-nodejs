const express = require('express'),
router = express.Router();

const changeOldPassword = require('./change-password');

router.post("/changePassword", changeOldPassword.Change);

module.exports = router;