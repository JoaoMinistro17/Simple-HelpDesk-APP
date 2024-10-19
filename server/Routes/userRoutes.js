const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Update user profile
router.put('/profile', userController.updateUserProfile);

module.exports = router;