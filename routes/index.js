const { Router } = require('express');
const UserController = require('../controllers/User.controller');

const router = Router();

// POST http://localhost:5000/api/user
router.post('/user', UserController.createUser);
// GET http://localhost:5005/api/users
router.get('/users', UserController.findAll)
// GET http://localhost:5000/api/user/25
router.ger('/user/:id', UserController.findByPk);
// DELETE http://localhost:5000/api/user/25
router.delete('user/:id', UserController.deleteByPk);
// PUT http://localhost:5000/api/user/25
router.pur('/user/:id', UserController.updateUser);


module.exports = router;