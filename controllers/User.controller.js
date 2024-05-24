const { User, Group } = require('../models');
const UserError = require('../errors/UserError');

module.exports.createUser = async(req, res, next) => {
    try {
        const { body } = req;

        const createdUser = await User.create(body);

        return res.status(201).send(createdUser);
    } catch (error) {
        next(error);
    }
}

module.exports.findAll = async(req, res, next) => {
    try {
        const resultsArray = await User.findAll();

        return res.status(200).send(resultsArray);
    } catch (error) {
        next(error);
    }
}

module.exports.findByPk = async(req, res, next) => {
    try {
        const { params: { id } } = req;
        
        return res.status(200).send(getUserInstance);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteByPk = async(req, res, next) => {
    try {
        const { params: { id } } = req;

        const rowsCount = await User.destroy({
            where: {
                id
            }
        });

        if(rowsCount) {
            return res.status(200).send('Successfull delete');
        } else {
            getUserInstance   
            return res.status(204).end();
        }
    } catch (error) {
        next(error);
    }
}

// module.exports.updateUser = async(req, res, next) => {
//     try {
//         const { params: { id }, body } = req;

//         const updatedUsersArray  = await User.update(body, {
//             where: {
//                 id
//             },
//             returning: true
//         });

//         return res.status(200).send(updatedUsersArray);
//     } catch (error) {
//         next(error);
//     }
// }

module.exports.updateUser = async(req, res, next) => {
    try {
        const { body } = req;

        const { getUserInstance } = req;
        
        const result = await foundUser.update(body);
       
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

// У відповіді отримати інформацію про сутність юзера + інформацію про всі групи,
// в яких цей юзер перебуває 

  // Це приклад Lazy Loading 
  /*
module.exports.getUserWithGroups = async (req, res, next) => {
    try {
        // 1. Спочатку ми витягаємо з бази юзера, сутність якого хочемо отримати
        const { params: { userId } } = req;
        const user = await User.findByPk(userId);
        if(!userInstance) {
            throw new UserError('User not found');
        }

        // 2. Витягаємо всі групи юзера (магічний метод)
        // parant.getChildren()
        const groupsArray = await userInstance.getGroups();

        // 3. Ми отримали і юзера і групи у п.1, п.2
        // Складаємо результат, як потрібно
        return res.status(200).send({data: { userInstance, groupsArray }});
    } catch (error) {
        next(error);
    }
} */

// Голодне (моментальне) завантаження
module.exports.getUserWithGroups = async (req, res, next) => {
    try {
        const { params: { userId } } = req;

        // Отримуємо і юзера і його групи за один запит
        const userWithGroups= await User.findByPk(userId, {
            attributes: ['id', 'first_name', 'last_name'],
            include: { // INNER JOIN
                model: Group,
                required: true,
                through: {
                    attributes: [] // працює на зв'язуючу таблицю users_to_groups
                },
                attributes: ['id', 'name'] // працює на таблицю groups
            }
        });

        if(!userWithGroups) {
            throw new UserError('User not found');
        }

        // Перед відправкою на сервер - видаляємо пароль з результату запиту
        // Перетворити userWithGroups як об'єкт  JSON
        const userWithGroupsJSON = userWithGroups.toJSON();
        //Видаляємо поле password з JSON
        delete userWithGroups.password;

        return res.status(200).send(userWithGroups);
    } catch (error) {
        next(error);
    }
}