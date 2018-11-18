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
    let titleOfTask = req.body.title;
    if (!titleOfTask || !titleOfTask.trim()) {
        return res.json(response);    
    }
    const newTaskData = {
        title: titleOfTask.trim(),
        content: req.body.content,
        due_date: req.body.date_due
    };
    try {
        let newTask = new TaskSchema(newTaskData);
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

async function edit(req, res) {
    let response = {success: false};
    let title = '';
    if (req.body.title) {
        title = req.body.title;
        title = title.trim();
    }
    if (!title || !req.body.id) {
        return res.json(response);    
    }
    try {
        await TaskSchema.findOneAndUpdate({_id: req.body.id}, {title: title});
        response.success = true;
        return res.json(response);
    } catch(error) {
        return res.json(response);
    }
}

async function remove(req, res) {
    let response = {success: false};
    if (!req.body.id) {
        return res.json(response);    
    }
    try {
        await TaskSchema.remove({_id: req.body.id});
        response.success = true;
        return res.json(response);
    } catch(error) {
        return res.json(response);
    }
}

module.exports = { getTasks, add, finished, edit, remove };