import { TEST_DATA, UPDATE_CHANNEL_ID, UPDATE_COURSE_DETAIL } from "../constants/constants";

const initialState = {
    test: [],
    pastQuestions: [],
    channelId: "",
    courses: {},
}



const testReducer = (state = initialState, action) => {
    const { test, type, pastQuestions, channelId, courses } = action;

    switch (type) {
        case TEST_DATA:
            return {
                ...state, test,
            };
        case UPDATE_CHANNEL_ID:
            return {
                ...state, channelId,
            };
        case UPDATE_COURSE_DETAIL:
            return {
                ...state, courses,
            }
        default:
            return state;
    }
}

export default testReducer;