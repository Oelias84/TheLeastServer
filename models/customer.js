const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  streetName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  doorNumber: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  houseNumber: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  cheapped: {
    type: Number,
    default: 0
  },
  tipped: {
    type: Number,
    default: 0
  },
  customerIsCheap: {
    type: Boolean,
    default:false
  },
  isTipped: {
    type: Boolean,
    required: true
  }

}));

function validateCustomer(customer) {
  const schema = {
    city: Joi.string().min(2).max(50).required(),
    streetName: Joi.string().min(2).max(50).required(),
    doorNumber: Joi.string().min(1).max(5).required(),
    houseNumber: Joi.string().min(1).max(5).required(),
    isTipped: Joi.boolean().required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;
