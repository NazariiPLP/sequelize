const { TASK_SCHEMA } = require('../schemas/task.schema');

module.exports.validateTask() = async(req, res, next) => {
 try {
    const { body } = req;
    
    const validateTask = await TASK_SCHEMA.validate(body);

    if(validateTask) {
        next();
    }
 } catch (error) {
    next(error);
 }
}