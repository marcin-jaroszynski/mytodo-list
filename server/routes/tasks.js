const TaskSchema = require('../db/models/task');

async function getTasks(req, res) {
    let response = {success: false, tasks: []};
    try {
        response.tasks = await TaskSchema.tasks();
        response.success = true;
        res.json(response);
    } catch(error) {
        res.json(response);
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
        // console.log('TaskSchema.addedTask: ', newTask.id);
        response.success = true;
        res.json(response);
    } catch(error) {
        res.json(response);
    }
}

module.exports = { getTasks, add };