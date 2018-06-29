const TaskSchema = require('../db/models/task');

async function getTasks(req, res) {
    let tasks = await TaskSchema.tasks();
    res.json({success: true, tasks: tasks});
}

module.exports = { getTasks };