'use strict';
const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);



router.get('/notes', (req, res,next) => {
  const {searchTerm} = req.query;
  notes.filter(searchTerm,(err,list)=>{
    if(err){
      return next(err);
    }
    res.json(list);
  });
});

router.get('/notes/:id',(req,res)=>{
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

router.put('/notes/:id', (req, res, next) => {
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

router.post('/notes',(req,res,next)=>{
  const {title,content} = req.body;
  const newItem = {title,content};
  //now validate it 
  if(!newItem.title){
    const err = new Error('missing title in request body');
    err.status = 400;
    return next(err);
  }
  notes.create(newItem,(err,item)=>{
    if(err){
      return next(err);
    }
    else if(item){
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    }
    else{
      next();
    }
  });
});

router.delete('/notes/:id',(req,res,next)=>{
  const id = req.params.id;
  notes.delete(id ,(err,len)=>{
    if(err){
      const err = new Error('id does not exist in database');
      err.status = 400;
      return next(err);
    }
    else if(len){
      res.location(`http://${req.headers.host}/notes/${id}`).status(202).json(id);
    }
    else{
      next();
    }
  });

});


module.exports = router;



