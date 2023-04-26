const assert = require('assert');

const UserReportController = require('./user-report-controller');
const UserReportBuilder = require('./user-report-builder');
const SubmittedOrderStub = require('./stubs/submitted-order-stub');
const AnotherSubmittedOrderStub = require('./stubs/another-submitted-order-stub');
const NotSubmittedOrderStub = require('./stubs/not-submitted-order-stub');
const SubmittedNegativeOrderStub = require('./stubs/submitted-negative-order-stub');

describe('UserReportController', () => {
    const USER_ID = '123';
    let orders = [new SubmittedOrderStub(), new AnotherSubmittedOrderStub(), new NotSubmittedOrderStub()];
    let userReportController;
    let userReportBuilder;
    let model;

    const isNotExistUser = userId => userId !== USER_ID;
    const userMock = {
        getAllOrders: () => orders
    };
    const userDaoMock = {
        getUser: (userId) => {
            return isNotExistUser(userId) ? null : userMock;
        }
    };

    class ModelStub {
        constructor() {
            this.attributes = new Map();
        }

        addAttribute(name, s) {
            this.attributes.set(name, s);
        }

        getAttribute(name) {
            return this.attributes.get(name);
        }
    }

    before(() => {
        userReportController = new UserReportController();
        userReportBuilder = new UserReportBuilder();

        userReportController.setUserReportBuilder(userReportBuilder);
        userReportBuilder.setUserDao(userDaoMock);

        model = new ModelStub();
    });

    it('should calculate sum of all submitted orders', () => {
        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.strictEqual('userTotal', amount);
        assert.strictEqual('User Total: 363.15$', model.getAttribute('userTotalMessage'));
    });


    it('should get warning message when user doesnt exist', () => {
        const amount = userReportController.getUserTotalOrderAmountView('0001', model);

        assert.strictEqual('userTotal', amount);
        assert.strictEqual('WARNING: User ID doesn\'t exist.', model.getAttribute('userTotalMessage'));
    });

    it('should get error message when order have negative amount', () => {
        orders.push(new SubmittedNegativeOrderStub());

        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.strictEqual('userTotal', amount);
        assert.strictEqual('ERROR: Wrong order amount.', model.getAttribute('userTotalMessage'));
    });

    it('should get warning message when user have no submitted orders', () => {
        orders = [];

        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.strictEqual('userTotal', amount);
        assert.strictEqual('WARNING: User have no submitted orders.', model.getAttribute('userTotalMessage'));
    });

    it('should redirect to error page when connection to db is null', () => {
        userReportBuilder.setUserDao(null);

        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.strictEqual('ERROR: Technical Error', amount);
    });
});
