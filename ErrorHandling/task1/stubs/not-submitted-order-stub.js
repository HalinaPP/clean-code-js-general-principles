module.exports = class NotSubmittedOrderStub {
    total() {
        return 99.99;
    }

    isSubmitted() {
        return false;
    }
}
