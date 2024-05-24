const { Group } = require('../models');

module.exports.createGroup = async(req, res, next) => {
    try{
        const { body } = req;

        const created = await Group.create(body);

        return res.status(201).send(created);
    } catch (error) {
        next(error);
    }
}

module.exports.addUserToGroup = async(req, res, next) => {
    try {
        const { userInstance, params: { groupId } } = req; 

        // 1. Знайти сутність групи, у яку потрібно додати юзера
        const groupInstance = await Group.findByPk(groupId);

        // 2. Додаємо в знайдену групу юзера
        // parent.addChild(child)
        const result = await groupInstance.addUser(userInstance);

        return res.status(200).send('User successfully added to group');
    } catch (error){
        next(error);
    }
}

// Знаходження всіх груп, якогось конкретного юзера

module.exports.getUserGroups = async(req, res, next) => {
    try {
        // 1. Знайти сутність користувача, групи якого нам потрібно знайти
        const { userInstance } = req;
        
        // 2. Знайти групи користувача
        // parent.getChildren()
        const groups = await userInstance.getGroups();

        return res.status(200).send(groups);
    } catch (error) {
        next(error);
    }
}
