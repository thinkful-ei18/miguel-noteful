'use strict';
const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);



router.get('/notes', (req, res,next) => {
  const {searchTerm} = req.query;
  notes.filter(searchTerm)
    .then(item=>{
      if(item){
        res.json(item);
      }
      else{
        next();
      }
    })
    .catch(err=>next(err));
  
});

router.get('/notes/:id',(req,res,next)=>{
  const {id} = req.params;
  const rawId =parseInt(id,10);
  notes.find(rawId)
    .then(item =>{
      if(item){
        res.json(item);
      }
      else {
        next();
      }
    })
    .catch(err=>next(err));
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

  notes.update(id,updateObj)
    .then(item=>{
      if(item){
        console.log('changes happen');
        res.json(item);
      }
      else{
        next();
      }
    })
    .catch(err=>{
      console.log('ceral');
      next(err);});
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
  notes.create(newItem)
    .then(item=>{
      if(item){
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      }
      else{
        next();
      }
    })
    .catch(err=>next(err));
});

router.delete('/notes/:id',(req,res,next)=>{
  const id = req.params.id;
  notes.delete(id)
    .then(len=>{
      if(len){
        res.location(`http://${req.headers.host}/notes/${id}`).status(202).json(id);
      }
      else{
        next();
      }
    })
    .catch(err=>{
      err = new Error('id does not exist in database');
      err.status = 400;
      next(err);
    });
});


module.exports = router;



