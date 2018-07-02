const TaskSchema = require('../db/models/task');

async function getTasks(req, res) {
    let response = {success: false, tasks: []};
    try {
        response.tasks = await TaskSchema.tasks();
        response.success = true;
        return res.json(response);
    } catch(error) {
        return res.json(response);
    }
}

async function add(req, res) {
    let response = {success: false, task: null};
    if (!req.body.title) {
        return res.json(response);    
    }
    try {
        let newTask = new TaskSchema({title: req.body.title});
        newTask.save();
        response.task = newTask;
        response.success = true;
        return res.json(response);
    } catch(error) {
        return res.json(response);
    }
}

async function finished(req, res) {
    let response = {success: false, finished_date: ''};
    if (!req.body.id) {
        return res.json(response);
    }
    try {
        response.finished_date = await TaskSchema.markAsFinished(req.body.id);
        response.success = true;
        return res.json(response);
    } catch(error) {
        return res.json(response);
    }
}

module.exports = { getTasks, add, finished };