const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('abselute', () => {
    it('sould return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('sould return a negative number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('sould return a 0 number if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('sould return the greeting message', ( ) => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        //Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too specific
        /*expect(resolt[0]).toBe('USD');
        expect(resolt[1]).toBe('AUD');
        expect(resolt[2]).toBe('EUR');
        expect(result.length).toBe(3);*/

        //Proper way
        /*expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');*/

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('sould return the product with the ginven id', () => {
        const result = lib.getProduct(1);
        //expect(result).toEqual({ id: 1, price: 10 });
        
        expect(result).toMatchObject({id: 1, price: 10});
        // OR 
        expect(result).toHaveProperty('id', 1);
    })
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // Null
        // undefined
        // NaN
        // ''
        // 0
        // false
        const args = [null, undefined,NaN,'',0,false];
        args.forEach(a => {
            expect(() => {lib.registerUser(a)}).toThrow();
        }); 
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('ofir');
        expect(result).toMatchObject({username: 'ofir' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('fizzBuzz', () => {
    it('should throw if input is not a number', () => {
        const args = [null, undefined,'',false];
        args.forEach(a => {
            expect(() => {lib.fizzBuzz(a)}).toThrow();
        });
    });

    it('sould return fizzBuzz if the input is devisable by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toContain('FizzBuzz');
    });

    it('sould return fizz if the input is devisable by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toContain('Fizz');
    });

    it('sould return buzz if the input is devisable by 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toContain('Buzz');
    });

    it('sould return the input if its not devisable by 3 and 5', () => {
        const result = lib.fizzBuzz(2);
        expect(result).toBe(2);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if the customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId){
            console.log('Fake reading customer...');
            return{ id: customerId, points: 20}
        }
        
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })
})

describe('notifyCustomer', () => {
   
    it('should send an email to the customer', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        //Return function - mockFunction.mockReturnValue(1);
        //Promis function - mockFunction.mockResolveValue(1);
        //mockFunction.mockRejetedValeue(new Error('...'));

        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1});

        expect(mail.send).toHaveBeenCalled();
    });
});