process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
let server = require('../../server');
const TaskSchema = require('../../db/models/task');
const DateUtil = require('../../util/date');
const DbHelper = require('../db/helper');

chai.use(chaiHttp);

describe('API: Task', () => {
    let token = '';
    beforeEach(async () => {
      token = await DbHelper.generateToken();
    });

    afterEach(async () => {
      await DbHelper.clear();
    });

    let getRequestParams = (params) => {
      return Object.assign({ token: token }, params);
    };

    it('Fetch tasks', async () => {
      let params = getRequestParams();
      const response = await chai.request(server).get('/api/tasks').query(params);
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('success').which.is.eql(true);
      response.body.should.have.property('tasks').which.is.instanceof(Array);
    });

    describe('Add Task',  () => {
      it('Should add task',  async () => {
        let params = getRequestParams({ title: 'New Task' });
        const response = await chai.request(server).post('/api/task/add').send(params);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(true);
        response.body.should.have.property('task').which.is.not.empty;
      });

      it('Should fail if title is not send', async () => {
        let params = getRequestParams();
        const response = await chai.request(server).post('/api/task/add').send(params);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(false);
      });

      it('Should fail if title is contain only whitespaces', async () => {
        let params = getRequestParams({ title: '   '});
        const response = await chai.request(server).post('/api/task/add').send(params);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(false);
      });
    });

    describe('Mark task as finished', () => {
      let addedTask = '';
      beforeEach(async () => {
        addedTask = new TaskSchema({ title: 'Task 1' });
        await addedTask.save();
      });
      it('Should mark task as finished', async () => {
        let params = getRequestParams({ id: addedTask.id });
        const response = await chai.request(server).post('/api/task/finished').send(params);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(true);
        response.body.should.have.property('finished_date').which.is.not.empty;
      });
    });

    describe('Edit title of task', () => {
      let taskToEdit = '';
      beforeEach(async () => {
        taskToEdit = new TaskSchema({ title: 'Task 1' });
        await taskToEdit.save();
      });
      it('Should edit title of task successfully', async () => {
        let params = getRequestParams({ id: taskToEdit.id, title: 'Task 1 - edited' });
        const response = await chai.request(server).post('/api/task/edit').send(params);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(true);
      });

      it('Should fail if title is empty', async () => {
        let params = getRequestParams({ id: taskToEdit.id, title: '' });
        const response = await chai.request(server).post('/api/task/edit').send(params);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(false);
      });
    });

    describe('Remove task', () => {
      let taskToRemove = '';
      beforeEach(async () => {
        taskToRemove = new TaskSchema({ title: 'Task to remove' });
        await taskToRemove.save();
      });
      it('Should remove task', async () => {
        let params = getRequestParams({ id: taskToRemove.id });
        const response = await chai.request(server).post('/api/task/remove').send(params)
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(true);
      });
    });

    describe('Daily tasks', () => {
      const dueDate = DateUtil.getCurrent();
      const numOfAddedTask = 3;
      beforeEach(async () => {
        for (let i = 1; i <= numOfAddedTask; i++) {
          let addedTask = new TaskSchema({ title: 'Task '+i, due_date: dueDate });
          await addedTask.save();
        }
        let otherAddedTask = new TaskSchema({ title: 'Task X' });
        await otherAddedTask.save();
      });
      it('Should fetch tasks for today', async () => {
        let params = getRequestParams();
        const response = await chai.request(server).get('/api/tasks/daily').query(params);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success').which.is.eql(true);
        response.body.should.have.property('tasks').which.is.instanceof(Array);
        response.body.should.have.property('tasks').to.have.lengthOf(numOfAddedTask);
      });
    });
});
