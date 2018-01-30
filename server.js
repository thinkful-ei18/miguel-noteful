'use strict';
const express = require('express');
const data = require('./db/notes');



const app = express();
const {PORT} = require('./config');
const {ourLogger} = require('./middlewares/logger');

app.use(express.static('public'));
app.use(ourLogger);


app.get('/v1/notes', (req, res) => {
  if(!req.query.searchTerm){
    res.json(data);
  }
  else{
    const mySearch=data.filter(note=>note.title.includes(req.query.searchTerm));
    res.json(mySearch);
  }
});

app.get('/boom',(req,res,next)=>{
  throw new Error('Boom!!');
  next();
});

app.get('/v1/notes/:id',(req,res)=>{
  const {id} = req.params;
  const rawId =parseInt(id,10);
  console.log(rawId);
  res.json(data.find(item=>item.id===rawId));

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

