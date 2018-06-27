process.env.NODE_ENV = 'test';

const chai = require('chai'); 
const chaiHttp = require('chai-http');
const should = chai.should();
let server = require('../../server');

chai.use(chaiHttp);

describe('Calculation', () => {
  // it('2+2 is 4', () => {
  //   expect(2+2).toBe(4);
  // });

  it('Should returns notes for specific category', (done) => {
      chai.request(server)
          .get('/test')
          // .query(params)
          .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(true);
            done();
          });
    });
});