const { Task, User } = require('../models');

module.exports.createTask = async(req, res, next) => {
    try {
        const { body, userInstance } = req;
        
        // parent.createChild(body);
        const result = await userInstance.createTask(body);

        return res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUserTasks = async(req, res, next) => {
    try {
        const { userInstance, pagination } = req;
        
        // parent.getChildren()
        const tasks = await userInstance.getTasks({
            ...pagination
        });

        return res.status(200).send(tasks);
    } catch (error) {
        next(error);
    }
}

module.exports.getCountOfTasks = async(req, res, next) => {
    try {
        const { userInstance } = req;
        
        // parent.countChildren()
        const tasksCount = await userInstance.countTasks();

        return res.status(200).send(`${tasksCount}`);
    } catch (error) {
        next(error);
    }
}