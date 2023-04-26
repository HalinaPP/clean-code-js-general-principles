const assert = require('assert');

const mortgageInstallmentCalculator = require('./mortgage-installment-calculator');
const InvalidInputException = require('./thirdparty/invalid-input-exception');

describe('MortgageInstallmentCalculator', () => {
    describe('calculateMonthlyPayment', () => {
        it('should calculate monthly payment when amount is small', () => {
            const payment = mortgageInstallmentCalculator.calculateMonthlyPayment(1000, 1, 12);

            assert.strictEqual(+payment.toFixed(2), 88.85);
        });

        it('should calculate monthly payment when amount is large', () => {
            const payment = mortgageInstallmentCalculator.calculateMonthlyPayment(10000000, 1, 12);

            assert.strictEqual(+payment.toFixed(2), 888487.89);
        });

        it('should calculate monthly payment when principal is zero', () => {
            const payment = mortgageInstallmentCalculator.calculateMonthlyPayment(0, 1, 12);

            assert.strictEqual(payment, 0);
        });

        it('should calculate monthly payment when interest rate is zero', () => {
            const payment = mortgageInstallmentCalculator.calculateMonthlyPayment(1000, 1, 0);

            assert.strictEqual(+payment.toFixed(2), 83.33);
        });

        it('should throw InvalidInputException on negative tenure', () => {
            assert.throws(() => {
                mortgageInstallmentCalculator.calculateMonthlyPayment(20, -10, 14.5);
            }, InvalidInputException);
        });

        it('should throw InvalidInputException on negative interest rate', () => {
            assert.throws(() => {
                mortgageInstallmentCalculator.calculateMonthlyPayment(20, 1, -12);
            }, InvalidInputException);
        });

        it('should throw InvalidInputException on negative principal amount', () => {
            assert.throws(() => {
                mortgageInstallmentCalculator.calculateMonthlyPayment(-20, 10, 14.5);
            }, InvalidInputException);
        });
    });
});
