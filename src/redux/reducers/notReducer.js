import { PAST_QUESTIONS, UPDATE_LEADERBOARD, } from "../constants/constants";

const initialState = {
    pastQuestions: [],
    leaderboard: [],
}



const notReducer = (state = initialState, action) => {
    const { type, pastQuestions, leaderboard } = action;

    switch (type) {

        case PAST_QUESTIONS:
            return {
                ...state, pastQuestions,
            };
        case UPDATE_LEADERBOARD:
            return {
                ...state, leaderboard,
            };

        default:
            return state;
    }
}

export default notReducer;