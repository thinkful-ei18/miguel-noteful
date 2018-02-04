'use strict';
const chai = require('chai');
const app = require('../server');
const chaiHttp = require('chai-http');
const spies =require('chai-spies');

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(spies);


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
    const goodIds = 1001;
  
    return chai.request(app)
      .get(`/v1/notes/${goodIds}`)
      .then((res)=>{
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body).to.include.keys('title','content','id');
      });
    
  });
  it('should return error on non existent id',()=>{
    const badIds = 424;
  
    return chai.request(app)
      .get(`/v1/notes/${badIds})`)
      .then((res)=>{
        expect(res).to.have.status(404);
      })
      .catch(err=>err);

  
  });
});

describe('PUT /v1/notes/id',()=>{
  it('should return 200 on edited object params',()=>{
    const goodTestObjs= {'title':'test','content':'test test test'};
    return chai.request(app)
      .put('/v1/notes/1001')
      .send(goodTestObjs)
      .then(res=>{
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.title).to.equal(goodTestObjs.title);
        expect(res.body.content).to.equal(goodTestObjs.content);
      });
  });


  it('should return 404 on invalid id',()=>{
    const spy = chai.spy();
    const badObj= {'title':'test1','baedKey2':'41d'};

    return chai.request(app)
      .put('/v1/notes/1337')
      .send(badObj)
      .then(spy)
      .then(() => {
        expect(spy).to.not.have.been.called();
      })
      .catch(err => {
        expect(err).to.have.status(404);
      });
  });
});

describe('POST /v1/notes should POST new items', () => {
  it('should return 201 on new item POST',()=>{
    const goodItems = {'title':'test1fpoekafopekafopk','content':'12345'};
   
    return chai.request(app)
      .post('/v1/notes')
      .send(goodItems)
      .then(res =>{
        expect(res).to.have.status(201);
      });
  });
  it('should return 400 and Bad Request on wrong keys',function (){
    const badItem = {'badkey':'baaad','wookie':'cookie'};
    const spy = chai.spy();
    return chai.request(app)
      .post('/v1/notes')
      .send(badItem)
      .then(spy)
      .then(()=>{
        expect(spy).to.not.have.been.called();
      })
      .catch(err=>{
        expect(err.message).to.equal('Bad Request');
        expect(err).to.have.status(400);

      });
  });
});

describe('DELETE /v1/notes/id',()=>{
  it('Should return 202 on succesful delete',()=>{
    return chai.request(app)
      .delete('/v1/notes/1005')
      .then(res=>{
        expect(res).to.have.status(202);
        expect(res.body).to.equal('1005');
      });
  });
  it('Should return 404 on invalid id',()=>{
    const spy = chai.spy();
    return chai.request(app)
      .delete('/v1/notes/667')
      .then(spy)
      .then(()=>{
        expect(spy).to.not.have.been.called();
      })
      .catch(err=>{
        expect(err.response).to.have.status(404);
      });
  });
});









