const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

const validateName = (name) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(name);
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!validateName(firstName) || !validateName(lastName)) {
      return res.status(400).send({ error: 'First name and last name must contain only alphabetic characters.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).send({ error: 'Please enter a valid email address.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).send({ 
        error: 'Password must contain at least 6 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'You already have an account with us. Please login.' });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).send({ error: 'Failed to register' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send({ error: 'Please enter a valid email address.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(400).send({ error: 'Failed to login' });
  }
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`https://task-manager-cg.netlify.app/home?token=${token}`);
};
