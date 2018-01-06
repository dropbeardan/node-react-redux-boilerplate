const defaultState = {
    time: ''
};

const demoReducer = (state = defaultState, action) => {

    switch (action.type) {

        case 'DEMO_SET': {
            let payload = Object.keys(action.payload).reduce((result, key) => {
                return {
                    ...result,
                    [key]: action.payload[key]
                };
            }, {});

            return {
                ...state,
                ...payload
            };
        }

        default: {
            return state;
        }
    }
};

export default demoReducer;