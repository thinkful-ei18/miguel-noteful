'use strict';
const chai = require('chai');
const app = require('../server');
const chaiHttp = require('chai-http');
const spies =require('chai-spies');
chai.use(spies);

const expect = chai.expect;


chai.use(chaiHttp);

describe('Reality check', function () {
  it('true should be true', function () {
    expect(true).to.be.true;
  });
  it('2+2 should be 4', function () {
    expect(2+2).to.equal(4);
  });
});

describe('Express static', function (){
  it('Get request on "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then((res)=>{
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    const spy = chai.spy();
    return chai.request(app)
      .get('/bad/path')
      .then(spy)
      .then(() => {
        expect(spy).to.not.have.been.called();
      })
      .catch(err => {
        expect(err.response).to.have.status(404);
      });
  });

});

describe('GET /v1/notes returns our list',function(){
  it('should return a list on items', function () {
    return chai.request(app)
      .get('/v1/notes')
      .then((res)=>{
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(10);
        const expectedKeys = ['title','content','id'];
        res.body.forEach(item=>{
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });
});

describe('GET /v1/notes/:id', ()=> {
  it('should return a specific list item given id',()=>{
    const goodIds = [1001,1002,1003];
    const expectedKeys = ['title','content','id'];
    goodIds.forEach(id=>{
      return chai.request(app)
        .get(`/v1/notes/${id}`)
        .then((res)=>{
          expect(res).to.have.status(200);
          expect(res).to.be.a('object');
          expect(res).to.include.keys(expectedKeys);
        });
    });
    
  });
  it('should return error on non existent id',()=>{
    const badIds = [4344,3434,4];
    badIds.forEach(id=>{
      return chai.request(app)
        .get(`/v1/notes/${id})`)
        .then((res)=>{
          expect(res).to.have.status(404);
          expect(res).to.be.a('object');
        });

        
    });
  });
});
describe('PUT /v1/notes/id',()=>{
  it('should return 200 on edited object params',()=>{
    const goodtestObjs= [
      {"title":"test1","content":"12345"},
      {"title":"test1","content":"663163631"},
      {"title":"test1"}
    ];
    goodtestObjs.forEach(obj=>{
      return chai.request(app)
        .put('/v1/notes/1001')
        .send(obj)
        .then(res=>{
          expect(res).to.have.status(200);
          expect(res.body).to.be.json;
          expect(res.body).to.deep.equal(obj);
        });
    });
  });
  it('should return 404 error on wrong type of obj',()=>{
    const spy = chai.spy();
    const badObjs=[
      {"badKey":"test1","baedKey2":"41d"},
      ['wrongtypeofobj'],
      {'title':"lorem","badkey":"wookie"}
    ];
    badObjs.forEach(obj=>{
      return chai.request(app)
        .put('/v1/notes/1001')
        .send(obj)
        .then(spy)
        .then(() => {
          expect(spy).to.not.have.been.called();
        })
        .catch(err => {
          expect(err.response).to.have.status(404);
        });
    });
  });
});

describe('POST /v1/notes should POST new items', function () {
  it('should return 201 on new item POST',()=>{
    const goodItems = {'title':'test1','content':'12345'}
   
      return chai.request(app)
        .post('/v1/notes')
        .send(goodItems)
        .then(res=>{
          // console.log(res.status);
          expect(res).to.have.status(201);
        });

  });

  
});

















