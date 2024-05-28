const { Router } = require('express');
const { getUserInstance } = require('../middlewares/user.mv');
const GroupController = require('../controllers/Group.controller');
const multer = require('multer');
const path = require('path');

// const upload = multer({ dest: path.resolve(__dirname, '../public/images') });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
    } 
});

const upload = multer({ storage });

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
// GET http://localhost:5000/api/groups/:groupId/members
groupRouter.get('/:groupId/members', GroupController.getGroupWithMember);
// POST http://localhost:5000/api/groups/:groupId
groupRouter.post('/:groupId', upload.single('groupAvatar') ,GroupController.createGroupImage);

module.exports = groupRouter;

/*

1. Як фізично передати файл на сервер? Як зберегти файл на сервері
2. Як прописати шлях до файлу (image_path) відповідній групі
3. Як отримати файл з серверу

*/