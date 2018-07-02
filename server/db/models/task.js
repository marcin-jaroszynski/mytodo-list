const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskStatus = require('./taskStatus');

const taskSchema = new Schema({
	title: { type: String, required: true },
	status: { type: String, default: () => { return TaskStatus.IN_PROGRESS }},
	created_date: { type: Date, default: () => { return Date.now() }},
	finished_date: { type: Date }
});

taskSchema.static('tasks', async function() {
  let tasks = await this.find({});
  if (Object.keys(tasks).length === 0) {
    return [];
  }
  return tasks;
});

taskSchema.static('markAsFinished', async function(id) {
	let finishedDate = Date.now();
	await this.update({_id: id}, { $set: { status: TaskStatus.FINISHED, finished_date: finishedDate } });
	return finishedDate;
});

module.exports = mongoose.model('task', taskSchema);