const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBlogInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.shortDescription = !isEmpty(data.shortDescription) ? data.shortDescription : '';
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Поле обязательно к заполнению';
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = 'Поле обязателен к заполнению';
    }
    // if (Validator.isEmpty(data.shortDescription)) {
    //     errors.shortDescription = 'Поле обязателен к заполнению';
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
