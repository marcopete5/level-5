const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/bountiesdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Routes
app.use('/bounty', require('./routes/bountyRouter.js'));

// Start the server
app.listen(PORT, () => {
    console.log(`Bounty hunter server is running on port ${PORT}`);
});
