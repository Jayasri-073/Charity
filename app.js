const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const donationRouter = require('./routes/donationRoutes');
const patientRouter = require('./routes/patientRoutes');
const eventsRouter=require('./routes/events');
const charityRoutes = require('./routes/charityRoutes');
const authRouter = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/charity')
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/donation', donationRouter);
app.use('/patient', patientRouter);
app.use('/events',eventsRouter);

app.use('/charity', charityRoutes);


app.use('/admin', adminRoutes);

app.use('/auth', authRouter);



// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

module.exports = app;

