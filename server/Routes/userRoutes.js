const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Update user
router.put('/user/:id', userController.updateUser);

// Get all users
router.get('/user', userController.getAllUsers);

// Get user by id
router.get('/user/:id', userController.getUser);

module.exports = router;