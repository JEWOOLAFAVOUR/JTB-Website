import { GET_CHANNEL, GET_QUESTIONS, } from "../constants/constants";

const initialState = {
    questions: [],
    channel: {},
}


const midReducer = (state = initialState, action) => {
    const { type, questions, channel } = action;

    switch (type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions,
            };
        case GET_CHANNEL:
            return {
                ...state,
                channel,
            };
        default:
            return state;
    }
};

export default midReducer;