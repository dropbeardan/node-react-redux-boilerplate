const areFieldsProvided = require('../areFieldsProvided');

const requiredFields = [
    'cat',
    'dog',
    'elephant',
    'mouse'
];

test('Fail if not all of the required fields are provided.', () => {
    let dataSet = [
        {
            cat: 1,
            dog: 2,
            elephant: 3
        },
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            bat: 5
        }
    ];

    dataSet.forEach((data) => {
        expect(areFieldsProvided(requiredFields, data)).toBeFalsy();
    });
});

test('Pass if at least all of the required fields are provided.', () => {
    let dataSet = [
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            mouse: 4,
            bat: 5
        }
    ];

    dataSet.forEach((data) => {
        expect(areFieldsProvided(requiredFields, data)).toBeTruthy();
    });
});

test('Pass if the required field is defined, despite its value (except explicit undefined value).', () => {
    let dataSet = [
        {
            cat: 0,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: false,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: null,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: '',
            dog: 2,
            elephant: 3,
            mouse: 4
        }
    ];

    dataSet.forEach((data) => {
        expect(areFieldsProvided(requiredFields, data)).toBeTruthy();
    });
});


test('Accepts an Array as input.', () => {
    let validDataSet = [
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            mouse: 4
        },
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            mouse: 4,
            bat: 5
        }
    ];

    let invalidDataSet = [
        {
            cat: 1,
            dog: 2,
            elephant: 3
        },
        {
            cat: 1,
            dog: 2,
            elephant: 3,
            bat: 5
        }
    ];

    expect(areFieldsProvided(requiredFields, validDataSet)).toBeTruthy();
    expect(areFieldsProvided(requiredFields, invalidDataSet)).toBeFalsy();
});