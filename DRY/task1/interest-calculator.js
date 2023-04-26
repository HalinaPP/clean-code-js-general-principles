const SENIOR_AGE = 60;
const INTEREST_PERCENT = 4.5;
const SENIOR_PERCENT = 5.5;
const BONUS_AGE = 13;

function getInterest(accountDetails) {
    let interest = 0;

    if (isAccountStartedAfterBonusAge(accountDetails)) {
        interest = getInterestBasedOnAge(accountDetails);
    }

    return interest;
}

function isAccountStartedAfterBonusAge(accountDetails) {
    return getPersonAge(accountDetails) > BONUS_AGE;
}

function getDurationBetweenDatesInYears(from, to) {
    const start = new Date(from);
    const end = new Date(to);

    const diffYear = end.getFullYear() - start.getFullYear();

    if (yearNotCompleted(start, end) || monthNotCompleted(start, end)) {
        return diffYear - 1;
    }

    return diffYear;
}

function yearNotCompleted(start, end) {
    return end.getMonth() - start.getMonth();
}

function monthNotCompleted(start, end) {
    return end.getMonth() === start.getMonth() && end.getDate() < start.getDate()
}

function getInterestBasedOnAge(accountDetails) {

    const accountAge = getAccountAge(accountDetails);
    const balance = accountDetails.getBalance();

    if (isSenior(accountDetails)) {
        return getInterestByRate(balance, accountAge, SENIOR_PERCENT);
    }

    return getInterestByRate(doubleValue(balance), accountAge, INTEREST_PERCENT);
}

function isSenior(accountDetails) {
    return SENIOR_AGE <= getPersonAge(accountDetails);
}

function getAccountAge(accountDetails) {
    const dateFrom = accountDetails.getStartDate();
    const dateTo = new Date();

    return getDurationBetweenDatesInYears(dateFrom, dateTo)
}

function getPersonAge(accountDetails) {
    const dateFrom = accountDetails.getBirth();
    const dateTo = accountDetails.getStartDate();
    return getDurationBetweenDatesInYears(dateFrom, dateTo)
}

function getInterestByRate(principalAmount, durationInYears, annualInterestRate) {
    return principalAmount * durationInYears * annualInterestRate / 100;
}

function doubleValue(value) {
    return value * 2;
}

module.exports = {
    getInterest,
};
