process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
let server = require('../../server');
const DbHelper = require('../db/helper');

chai.use(chaiHttp);

describe('API: Login', () => {
  let getUserCreditentials = () => {
    return { login: 'user', password: 'pass' };
  };

  it('GET: it should returns token after successful login', (done) => {
    const params = getUserCreditentials();
    chai.request(server)
      .get('/api/login')
      .query(params)
      .end((err, res) => {
        //console.log('LoginTest.response: ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').which.is.eql(true);
        res.body.should.have.property('token').which.is.a('string').not.empty;
        done();
      });
  });
});
