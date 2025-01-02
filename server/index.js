const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Import the function
const postsRoutes = require('./routes/postsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const likeRoutes = require('./routes/likeRoutes');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB(); // Call the function

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/posts', postsRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);
app.use('/likes', likeRoutes);

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Central error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
