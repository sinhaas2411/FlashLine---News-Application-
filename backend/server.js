const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection with error handling
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('MongoDB connection error:', err));

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username, password });
    await user.save();
    
    console.log('User registered successfully:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login a user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.json({ token, username: user.username, userId: user._id });
});

// Fetch bookmarks for a specific user
app.get('/bookmarks', async (req, res) => {
  const { userId } = req.query;
  const user = await User.findById(userId);
  if (!user) return res.status(404).send('User not found');

  res.json(user.bookmarks);
});

// Add or remove bookmarks for a specific user
app.post('/bookmarks', async (req, res) => {
  const { userId, url } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).send('User not found');

  const isBookmarked = user.bookmarks.includes(url);
  if (isBookmarked) {
    user.bookmarks = user.bookmarks.filter(item => item !== url);  // Remove bookmark
  } else {
    user.bookmarks.push(url);  // Add bookmark
  }

  await user.save();
  res.send('Bookmarks updated');
});

app.listen(5000, () => console.log('Server running on port 5000'));
