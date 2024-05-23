const { User } = require('../models/');
const yup = require('yup');
const UserError = require('../errors/UserError');

module.exports.getUserInstance = async(req, res, next) => {
    try {
        const { params: { userId } } = req;
        const user = await User.findByPk(userId);

        if(!user) { // Не юзер, якщо юзера не знайдено
            throw new UserError('User not found!');
        }

        req.getUserInstance = user;

        next();
    } catch (error){
        next(error);
    }
}

module.exports.validateUser = async(req, res, next) => {
    try{
        const { body } = req;

        const validatedUser = await USER_SCHEMA.validate(body);

        if(validateUser) {
            next();
        }
    } catch(error) {
        next(error);
    }
}