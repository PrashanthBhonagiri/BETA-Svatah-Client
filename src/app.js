const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const app = express();
const contactus = require('./api/contactus');


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/', (req,res) => {
    res.json({
        "Info" : "Svatha - backend",
    });
});

app.use('/contactus',contactus);

function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${  req.originalUrl}`);
    next(error);
  }
  
  function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
      stack: err.stack,
    });
  }
  
  app.use(notFound);
  app.use(errorHandler);
  
  module.exports = app;