const { Router } = require('express');
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const groupRouter = require('./groupRouter');

const router = Router();

// http://localhost:5000/api/users
router.use('/users', userRouter);
// http://localhost:5000/api/users
router.use('/tasks', taskRouter);
// http://localhost:5000/api/groups
router.use('/groups', groupRouter);


module.exports = router;