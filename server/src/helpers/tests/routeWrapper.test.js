const routeWrapper = require('../routeWrapper');

// Mock HTTP response.
class ResClass {
    constructor() {
        this.statusCode;
        this.response;
    };

    status(statusCode) {
        this.statusCode = statusCode;

        return this;
    }

    json(response) {
        this.response = response;

        return {
            status: this.statusCode,
            response: this.response
        };
    }
};

const runTest = async (isBodyValid, routeFn) => {
    let requiredFields = [
        'cat',
        'dog',
        'elephant',
        'mouse'
    ];

    let req = isBodyValid ? {
        body: {
            cat: 1,
            dog: 2,
            elephant: 3,
            mouse: 4
        }
    } : {
            body: {}
        };

    let res = new ResClass();

    return await routeWrapper(requiredFields, routeFn)(req, res, null)
};

test('If any required fields are omitted from request body: Insufficient Details Provided (400).', async () => {

    let routeFn = (req, res) => {
        return true;
    };

    let response = await runTest(false, routeFn);

    let expectedResult = {
        status: 400,
        response: {
            message: 'Insufficient Details Provided.'
        }
    };

    expect(response).toEqual(expectedResult);
})

test('If function encounters error: Internal Server Error (500).', async () => {

    let routeFn = (req, res) => {
        throw 'Error';
    };

    let response = await runTest(true, routeFn);

    let expectedResult = {
        status: 500,
        response: {
            message: 'Internal Server Error.'
        }
    };

    expect(response).toEqual(expectedResult);
});

test('If function passes, function response should be returned.', async () => {

    let routeFn = (req, res) => {
        return res
            .status(200)
            .json({
                message: 'OK'
            });
    };

    let response = await runTest(true, routeFn);

    let expectedResult = {
        status: 200,
        response: {
            message: 'OK'
        }
    };

    expect(response).toEqual(expectedResult);
});