const setTime = (time) => {
    return {
        type: 'DEMO_SET',
        payload: {
            time: time
        }
    };
};

export default {
    setTime
};