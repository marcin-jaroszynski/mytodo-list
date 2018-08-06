process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const should = chai.should();
const expect = chai.expect;
let server = require('../../server');
const DbHelper = require('../db/helper');
const UserModel = require('../../db/models/user');
const TokenModel = require('../../db/models/token');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('API: Login', () => {
  let user = null;

  let getUserCreditentials = () => {
    return { login: 'user', password: 'pass' };
  };

  let getUserInvalidCreditentials = () => {
    return { login: 'notExistUser', password: 'invalidPass' };
  };

  let getUserWithToken = () => {
    return { token: 'token', login: user.login };
  };

  beforeEach(async function() {
    await TokenModel.setup();
    user = new UserModel(getUserCreditentials());
    await user.save();
  });

  afterEach(async function() {
    await DbHelper.clear();
  });

  it('POST: it should returns token after successful login', async () => {
    const params = getUserCreditentials();
    const response = await chai.request(server).post('/api/login').send(params);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.should.have.property('success').which.is.eql(true);
    response.body.should.have.property('token').which.is.a('string').not.empty;
  });

  it('POST: For invalid login or password should fail', async () => {
    let error = null;
    let response = null;
    try {
      const params = getUserInvalidCreditentials();
      response = await chai.request(server).post('/api/login').send(params);
    } catch (e) {
      error = e.response;
    }
    should.not.exist(response, 'Response should be empty because there is 401 error code');
    error.should.have.status(401, 'HTTP error code');
    error.body.should.be.a('object');
    error.body.should.have.property('success').which.is.eql(false);
    error.body.should.have.property('token').which.is.empty;
  });

  it('POST: Login is correct but password is not - should fail', async () => {
    let error = null;
    let response = null;
    try {
      const params = getUserCreditentials();
      params.password = 'invalid password';
      response = await chai.request(server).post('/api/login').send(params);
    } catch (e) {
      error = e.response;
    }
    should.not.exist(response, 'Response should be empty because there is 401 error code');
    error.should.have.status(401, 'HTTP error code');
    error.body.should.be.a('object');
    error.body.should.have.property('success').which.is.eql(false);
    error.body.should.have.property('token').which.is.empty;
  });



  it('POST: Autologin: after send proper data should accept to autologin', async () => {
    let token = await UserModel.getToken(user.login);
    const params = { token: token, login: user.login };
    const response = await chai.request(server).post('/api/autologin').send(params);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.should.have.property('success').which.is.eql(true);
  });

});
