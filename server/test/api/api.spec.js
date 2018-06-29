process.env.NODE_ENV = 'test';

const chai = require('chai'); 
const chaiHttp = require('chai-http');
const should = chai.should();
let server = require('../../server');
const TaskSchema = require('../../db/models/task');

chai.use(chaiHttp);

describe('API: Task', () => {    
  it('Fetch tasks', (done) => {
      chai.request(server)
          .get('/api/tasks')
          .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(true);
            res.body.should.have.property('tasks').which.is.instanceof(Array);
            done();
          });
    });

  it('Add task', (done) => {
      let params = { title: 'New Task' };
      chai.request(server)
          .post('/api/task/add')
          .send('params')
          .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(true);
            done();
          });
  });
});