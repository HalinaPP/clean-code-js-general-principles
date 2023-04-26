module.exports = class AccountDetails {
    constructor(birth, startDate, balance) {
        this.birth = birth;
        this.startDate = startDate;
        this.balance = balance;
    }

    getBirth() {
        return this.birth;
    }

    setBirth(birth) {
        this.birth = birth;
    }

    getStartDate() {
        return this.startDate;
    }

    setStartDate(startDate) {
        this.startDate = startDate;
    }

    getBalance() {
        return this.balance;
    }

    setBalance(balance) {
        this.balance = balance;
    }
};
