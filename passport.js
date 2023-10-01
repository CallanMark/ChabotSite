require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const port = 3004;// Other ports handing API calls 
// Connect to MongoDB
const mongoURI = process.env.Mongo_URI; // Replace with your URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// User model (for demonstration)
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String  // Note: In a real-world scenario, never store plain-text passwords. Use a library like bcrypt to hash them.
}));

// Routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
        if(!user) {
            return res.status(400).send('User not found');
        }
        if(user.password !== password) {  // Again, this is overly simplistic. Use bcrypt in real applications.
            return res.status(400).send('Invalid credentials');
        }
        res.send('Logged in successfully');
    });
});

app.listen(3004, () => console.log('Server running on http://localhost:3004'));
