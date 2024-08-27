require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(passport.initialize());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
