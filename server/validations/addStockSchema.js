const Joi = require("joi");

const addStockSchema = {
  open: Joi.number().min(0).required(),
  close: Joi.number().min(0).required()
};

const updateStockSchema = {
  _id: Joi.string().required(),
  open: Joi.number().min(0).required(),
  close: Joi.number().min(0).required()
};

module.exports.addStockSchema = addStockSchema;
module.exports.updateStockSchema = updateStockSchema;
