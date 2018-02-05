'use strict';

const {PORT} = require('./config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const notesRouter = require('./routers/notes.router');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

//any request with /v1, no matter whats after v1, go to router
app.use('/v1',notesRouter);


app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

if(require.main === module){
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}
module.exports = app;
