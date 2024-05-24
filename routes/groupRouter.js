const { Router } = require('express');
const { getUserInstance } = require('../middlewares/user.mv');
const GroupController = require('../controllers/Group.controller');

const groupRouter = Router();

// group routes section
// POST http://localhost:5000/api/groups
groupRouter.post('/', GroupController.createGroup);
// PUT http://localhost:5000/api/groups/:userId/:groupId
groupRouter.put('/:userId/:groupId', getUserInstance, GroupController.addUserToGroup);
// GET http://localhost:5000/api/groups/:userId
groupRouter.get('/:userId', getUserInstance, GroupController.getUserGroups);
// DELETE http://localhost:5000/api/groups/:userId/:groupId
groupRouter.delete('/:userId/:groupId', getUserInstance, GroupController.deleteUserFromGroup);

module.exports = groupRouter;