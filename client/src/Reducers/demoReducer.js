const defaultState = {
    time: ''
};

const demoReducer = (state = defaultState, action) => {

    switch (action.type) {

        case 'DEMO_SET': {
            return {
                ...state,
                ...action.payload
            };
        }

        default: {
            return state;
        }
    }
};

export default demoReducer;