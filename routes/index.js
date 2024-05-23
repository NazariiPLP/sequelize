const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');
const { getUserInstance, validateUser } = require('../middlewares/user.mv');
const { validateTask } = require('../middlewares/task.mv');

const router = Router();

// POST http://localhost:5000/api/user
router.post('/user', validateUser, UserController.createUser);
// GET http://localhost:5000/api/users
router.get('/users', UserController.findAll);
// GET http://localhost:5000/api/user/25
router.get('/user/:userId', getUserInstance, UserController.findByPk);
// DELETE http://localhost:5000/api/user/25
router.delete('/user/:userId', UserController.deleteByPk);
// PUT http://localhost:5000/api/user/25
router.put('/user/:userId', getUserInstance, UserController.updateUser);


// POST http://localhost:5000/api/task/25
router.post('/task/:userId', validateTask, getUserInstance, TaskController.createTask);
// GET http://localhost:5000/api/tasks/25
router.get('/tasks/:userId', getUserInstance, TaskController.getAllUserTasks);
// GET http://localhost:5000/api/tasks-count/25
router.get('/tasks-count/:userId', getUserInstance, TaskController.getCountOfTasks);

module.exports = router;