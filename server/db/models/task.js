const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskStatus = require('./taskStatus');
const DateUtil = require('../../util/date');

const taskSchema = new Schema({
	title: { type: String, required: true },
	status: { type: String, default: () => { return TaskStatus.IN_PROGRESS }},
	content: { type: String },
	created_date: { type: Date, default: () => { return Date.now() }},
	finished_date: { type: Date },
	due_date: { type: Date, default: () => { return undefined }}
});

taskSchema.static('tasks', async function() {
  let tasks = await this.find({});
  if (Object.keys(tasks).length === 0) {
    return [];
  }
  return tasks;
});

taskSchema.static('markAsFinished', async function(id) {
	let finishedDate = new Date();
	let result = await this.update({_id: id}, { $set: { status: TaskStatus.FINISHED, finished_date: finishedDate } });
	return finishedDate;
});


taskSchema.static('dailyTasks', async function() {
  let tasks = await this.find({ due_date: DateUtil.getCurrent() });
  if (Object.keys(tasks).length === 0) {
    return [];
  }
  return tasks;
});

module.exports = mongoose.model('task', taskSchema);