process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
let server = require('../../server');
const DbHelper = require('../db/helper');
const UsetModel = require('../../db/models/user');

chai.use(chaiHttp);

describe('API: Login', () => {
  let getUserCreditentials = () => {
    return { login: 'user', password: 'pass' };
  };

  let getUserInvalidCreditentials = () => {
    return { login: 'notExistUser', password: 'invalidPass' };
  };

  beforeEach(async function() {
    let user = new UsetModel(getUserCreditentials());
    await user.save();
  });

  afterEach(async function() {
    await DbHelper.clear();
  });

  it('POST: it should returns token after successful login', (done) => {
    const params = getUserCreditentials();
    chai.request(server)
      .post('/api/login')
      .send(params)
      .end((err, res) => {
        //console.log('LoginTest.response: ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').which.is.eql(true);
        res.body.should.have.property('token').which.is.a('string').not.empty;
        done();
      });
  });

  it('POST: For invalid login or password should fail', (done) => {
    const params = getUserInvalidCreditentials();
    chai.request(server)
      .post('/api/login')
      .send(params)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('success').which.is.eql(false);
        res.body.should.have.property('token').which.is.empty;
        done();
      });
  });

  it('POST: Login is correct but password is not - should fail', (done) => {
    const params = getUserCreditentials();
    params.password = 'invalid password';
    chai.request(server)
      .post('/api/login')
      .send(params)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('success').which.is.eql(false);
        res.body.should.have.property('token').which.is.empty;
        done();
      });
  });
});
