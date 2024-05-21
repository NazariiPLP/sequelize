const { Task, User } = require('../models');

module.exports.createTask = async(req, res, next) => {
    try {
        const { body, userInstance } = req;
        
        // parent.createChild(body);
        const result = await user.createTask(body);


        return res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUserTasks = async(req, res, next) => {
    try {
        const { params: { userId } } = req;
        
        // 1. Потрібно знайти того самого юзера, таски якого нам потрібно знайти
        const user = await User.findByPk(userId);

        // 2. Потрібно витягнути вся таски знайденого юзера
        // parent.getChildren()
        const tasks = await user.getTasks();


        return res.status(200).send(tasks);
    } catch (error) {
        next(error);
    }
}

module.exports.getCountOfTasks = async(req, res, next) => {
    try {
        const { params: { userId } } = req;

        // 1. Потрібно знайти того самого юзера, таски якого нам потрібно порахувати
        const user = await User.findByPk(userId);

        // 2. Порахувати кількість тасок знайденого юзера
        // parent.countChildren()
        const tasksCount = await user.countTasks();

        return res.status(200).send('${taskCount}');
    } catch (error) {
        next(error);
    }
}