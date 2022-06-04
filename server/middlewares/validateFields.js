const { respuesta } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = respuesta, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validateFields,
};
