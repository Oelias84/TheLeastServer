

//Testing number
module.exports.absolute = function(number) {
    //if number >= 0 return number else return -number
    return (number >= 0) ? number : -number; 
}

//Testing string
module.exports.greet = function(name) {
    return 'Welcome ' + name;
}

//Testing Currencies
module.exports.getCurrencies = function() {
    return ['USD', 'AUD', 'EUR'];
    //return 1;
}

//Testing objects
module.exports.getProduct = function(productId){
    return { id: productId, price: 10, category: 'a' };
}

//Testing exceptions
module.exports.registerUser = function(username) {
    if(!username) throw new Error('Username is required!');

    return { id: new Date().getTime(), username: username }
}

//Exercise
module.exports.fizzBuzz = function(input) {
    if (typeof input !== 'number')
        throw new Error('Input should be a number.');

    if ((input % 3 === 0) && (input % 5) === 0)
        return 'FizzBuzz';
    
    if (input % 3 === 0)
        return 'Fizz';

    if (input % 5 === 0)
        return 'Buzz';
    
    return input;
}

const db = require('./db');
const mail = require('./mail');

//Mock function
module.exports.applyDiscount = function(order) {
    const customer = db.getCustomerSync(order.customerId);

    if (customer.points > 10)
    order.totalPrice *= 0.9;
}

module.exports.notifyCustomer = function(order) {
    const customer = db.getCustomerSync(order.customerId);
    
    mail.send(customer.mail, 'Your order was placed successfully.');
}