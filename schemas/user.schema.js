const yup = require('yup');

module.exports.USER_SCHEMA = yup.object({
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    email: yup.string().required().email('Invalid email'),
    password: yup.string().required().min(8),
    birthday: yup.date(),
    gender: yup.string()
});