process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
let server = require('../../server');
const TaskSchema = require('../../db/models/task');
const DbHelper = require('../db/helper');

chai.use(chaiHttp);

describe('API: Task', () => {
    let token = '';
    beforeEach(async () => {
      token = await DbHelper.generateToken();
    });

    let getRequestParams = (params) => {
      return Object.assign({ token: token }, params);
    };

    it('Fetch tasks', (done) => {
      let params = getRequestParams();
      chai.request(server)
          .get('/api/tasks')
          .query(params)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(true);
            res.body.should.have.property('tasks').which.is.instanceof(Array);
            done();
          });
    });

    describe('Add Task', () => {
      it('Should add task', (done) => {
        let params = getRequestParams({ title: 'New Task' });
          chai.request(server)
              .post('/api/task/add')
              .send(params)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').which.is.eql(true);
                res.body.should.have.property('task').which.is.not.empty;
                done();
              });
      });

      it('Should fail if title is not send', (done) => {
          let params = getRequestParams();
          chai.request(server)
                .post('/api/task/add')
                .send(params)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').which.is.eql(false);
                  done();
                });
      });

      it('Should fail if title is contain only whitespaces', (done) => {
          let params = getRequestParams({ title: '   '});
          chai.request(server)
                .post('/api/task/add')
                .send(params)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').which.is.eql(false);
                  done();
                });
      });
    });

    describe('Mark task as finished', () => {
      let addedTask = '';
      beforeEach(async () => {
        addedTask = new TaskSchema({ title: 'Task 1' });
        await addedTask.save();
      });
      it('Should mark task as finished', (done) => {
        let params = getRequestParams({ id: addedTask.id });
        chai.request(server)
                .post('/api/task/finished')
                .send(params)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').which.is.eql(true);
                  res.body.should.have.property('finished_date').which.is.not.empty;
                  done();
                });
      });
    });

    describe('Edit title of task', () => {
      let taskToEdit = '';
      beforeEach(async () => {
        taskToEdit = new TaskSchema({ title: 'Task 1' });
        await taskToEdit.save();
      });
      it('Should edit title of task successfully', (done) => {
        let params = getRequestParams({ id: taskToEdit.id, title: 'Task 1 - edited' });
        chai.request(server)
                .post('/api/task/edit')
                .send(params)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').which.is.eql(true);
                  done();
                });
      });

      it('Should fail if title is empty', (done) => {
        let params = getRequestParams({ id: taskToEdit.id, title: '' });
        chai.request(server)
                .post('/api/task/edit')
                .send(params)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').which.is.eql(false);
                  done();
                });
      });
    });

    describe('Remove task', () => {
      let taskToRemove = '';
      beforeEach(async () => {
        taskToRemove = new TaskSchema({ title: 'Task to remove' });
        await taskToRemove.save();
      });
      it('Should remove task', (done) => {
        let params = getRequestParams({ id: taskToRemove.id });
        chai.request(server)
                .post('/api/task/remove')
                .send(params)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').which.is.eql(true);
                  done();
                });
      });
    });
});
