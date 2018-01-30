'use strict';
const express = require('express');

const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);


const {PORT} = require('./config');
const {ourLogger} = require('./middlewares/logger');

const app = express();
app.use(express.static('public'));

app.use(ourLogger);
app.use(express.json());


app.get('/v1/notes', (req, res,next) => {
  const {searchTerm} = req.query;
  notes.filter(searchTerm,(err,list)=>{
    if(err){
      return next(err);
    }
    res.json(list);
  });
});

app.get('/v1/notes/:id',(req,res)=>{
  console.log('first endy');
  const {id} = req.params;
  const rawId =parseInt(id,10);
  notes.find(rawId, (err, item,next) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      res.json('not found');
    }
  });
});

app.put('/v1/notes/:id', (req, res, next) => {
  console.log('second endy');
  const id = req.params.id;
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];
 
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      console.log('a change occured');
      res.json(item);

    } else {
      next();
    }
  });
});


app.use(function (req, res, next) {
  var err = new Error('Not Found');
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


app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

