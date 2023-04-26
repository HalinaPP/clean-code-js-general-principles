const ERROR_MESSAGE = require('./error_constants.js');

module.exports = class UserReportBuilder {
    constructor() {
        this.userDao = null;
    }

    getUserTotalOrderAmount(userId) {

        this.validateUserDao();

        const user = this.userDao.getUser(userId);
        this.validateUser(user);

        const orders = user.getAllOrders();
        this.validateOrders(orders);

        return this.getTotalOrdersAmount(orders);
    }

    getTotalOrdersAmount(orders) {
        return orders.filter(order => order.isSubmitted())
            .reduce((totalAmount, order) => {
                const total = order.total();
                this.validateOrderAmount(total);
                return totalAmount + total;
            }, 0);

    }

    validateUserDao() {
        if (this.userDao === null)
            throw new Error(ERROR_MESSAGE.TECHICAL_ERROR);
    }

    validateUser(user) {
        if (user === null)
            throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    validateOrders(orders) {
        if (!orders.length)
            throw new Error(ERROR_MESSAGE.ORDERS_NOT_FOUND);
    }

    validateOrderAmount(amount) {
        if (amount < 0)
            throw new Error(ERROR_MESSAGE.WRONG_ORDER_AMOUNT);
    }

    getUserDao() {
        return this.userDao;
    }

    setUserDao(userDao) {
        this.userDao = userDao;
    }
}
