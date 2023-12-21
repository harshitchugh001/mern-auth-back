const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB Connected'))
.catch(err => console.error(`DB connection error: ${err.message}`));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Enable CORS for a specific origin or for all origins


// App middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

// Routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});

module.exports = app;
