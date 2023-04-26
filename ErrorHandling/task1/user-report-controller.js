const ERROR_MESSAGE = require("./error_constants");

const USER_TOTAL = 'User Total:';
const CURRENCY_SIGN = '$';
const USER_TOTAL_VIEW = 'userTotal';

module.exports = class UserReportController {
    constructor() {
        this.userReportBuilder = null;
    }

    getUserTotalOrderAmountView(userId, model) {
        let userTotalMessage = '';

        try {
            userTotalMessage = this.getUserTotalMessage(userId);
        } catch (error) {
            userTotalMessage = error;
           if (userTotalMessage === ERROR_MESSAGE.TECHICAL_ERROR) {
                return userTotalMessage;
            }
        }

        model.addAttribute('userTotalMessage', userTotalMessage);
        return USER_TOTAL_VIEW;
    }

    getUserTotalMessage(userId) {
        const amount = this.userReportBuilder.getUserTotalOrderAmount(userId);
        return `${USER_TOTAL} ${amount}${CURRENCY_SIGN}`;
    }

    getUserReportBuilder() {
        return this.userReportBuilder;
    }

    setUserReportBuilder(userReportBuilder) {
        this.userReportBuilder = userReportBuilder;
    }
}
