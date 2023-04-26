const InvalidInputException = require('./thirdparty/invalid-input-exception');

const MONTHS_IN_YEAR = 12;

exports.calculateMonthlyPayment = function (principalAmount, mortgageYears, interestPercentRate) {
    validateParams(principalAmount, mortgageYears, interestPercentRate);

    return calculatePayment(principalAmount, mortgageYears, interestPercentRate);

}

function calculatePayment(principalAmount, mortgageYears, interestPercentRate) {
    const mortgageMonths = yearsToMonth(mortgageYears);

    if (interestPercentRate === 0) return calculatePaymentWithoutInterest(mortgageMonths, principalAmount);

    const interestMonthsRate = getInterestMonthsRate(interestPercentRate)
    return calculatePaymentWithInterest(mortgageMonths, principalAmount, interestMonthsRate);
}

function yearsToMonth(years) {
    return years * MONTHS_IN_YEAR;
}

function calculatePaymentWithoutInterest(mortgageMonths, principalAmount) {
    return principalAmount / mortgageMonths;
}

function calculatePaymentWithInterest(mortgageMonths, principalAmount, interestMonthsRate) {
    return (principalAmount * interestMonthsRate) / (1 - Math.pow(1 + interestMonthsRate, -mortgageMonths));
}

function getInterestMonthsRate(interestPercentRate) {
    const interestDecimalRate =
        percentToDecimal(interestPercentRate);
    return interestDecimalRate / MONTHS_IN_YEAR;
}

function percentToDecimal(percent) {
    return percent / 100
};

function validateParams(principalAmount, mortgageYears, interestPercentRate) {
    if (isInvamalidPaymentParams(principalAmount, mortgageYears, interestPercentRate)) {
        throw new InvalidInputException('Negative values are not allowed');
    }
}

function isInvamalidPaymentParams(principalAmount, mortgageYears, interestPercentRate) {
    return principalAmount < 0 || mortgageYears <= 0 || interestPercentRate < 0
}
