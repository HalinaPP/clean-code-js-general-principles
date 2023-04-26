module.exports = class SubmittedNegativeOrderStub {
    total() {
        return -1.0;
    }

    isSubmitted() {
        return true;
    }
}
