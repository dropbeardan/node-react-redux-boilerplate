const isValid = (requiredFields, fields) => {
    let missingFields = requiredFields
        .map((requiredField) => {
            if (fields[requiredField] === undefined) {
                return false;
            }

            return true;
        })
        .includes(false);

    return !missingFields;
}

const areFieldsProvided = (requiredFields, body) => {
    if (Array.isArray(body)) {
        return !body
            .map((fields) => {
                return isValid(requiredFields, fields);
            })
            .includes(false);
    }

    return isValid(requiredFields, body);
};

module.exports = areFieldsProvided;