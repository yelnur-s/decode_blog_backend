const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // if (!Validator.isEmail(data.email)) {
  //   errors.login = 'Email is invalid';
  // }

  if (Validator.isEmpty(data.login)) {
    errors.login = 'Логин обязателен к заполнению';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Пароль обязателен к заполнению';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
