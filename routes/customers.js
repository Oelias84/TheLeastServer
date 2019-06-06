const {Customer, validate} = require('../models/customer'); 
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ 
    city: req.body.city,
    streetName: req.body.streetName,
    houseNumber: req.body.houseNumber,
    doorNumber: req.body.doorNumber
  });

  if (customer) return res.status(400).send('Customer already exist.');

  customer = new Customer({ 
    city: req.body.city,
    streetName: req.body.streetName,
    houseNumber: req.body.houseNumber,
    doorNumber: req.body.doorNumber,
    isTipped: req.body.isTipped
  });

  if (req.body.isTipped == false){
    if (customer.tipped > 0){
    customer.tipped --
    }
    if (customer.cheapped < 3){
    customer.cheapped ++
    }
  }

  if (req.body.isTipped == true){
    if (customer.cheapped > 0){
    customer.cheapped --
    }
    if (customer.tipped < 3){
    customer.tipped ++
    }
  }

  customer = await customer.save();
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById (req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});


//Update a customer
router.put('/update', async (req, res) => {
  let customer = await Customer.findOne (
    { city: req.body.city, 
      streetName: req.body.streetName, 
      houseNumber: req.body.houseNumber, 
      doorNumber: req.body.doorNumber
    });
  
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  if (req.body.isTipped == false){
    if (customer.tipped > 0){
    customer.tipped --
    }
    if (customer.cheapped < 4){
    customer.cheapped ++
    }
  }

  if (req.body.isTipped == true){
    if (customer.cheapped > 0){
    customer.cheapped --
    }
    if (customer.tipped < 4){
    customer.tipped ++
    }
  }

  if (customer.cheapped > 2){
    customer.customerIsCheap = true
  }else{
    customer.customerIsCheap = false
  }

  const result = await customer.save();
  res.send(result);
});

module.exports = router; 