const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBlogTypeInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    // data.description = !isEmpty(data.description) ? data.description : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Поле обязательно к заполнению';
    }
    // if (Validator.isEmpty(data.description)) {
    //     errors.description = 'Поле обязательно к заполнению';
    // }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};
