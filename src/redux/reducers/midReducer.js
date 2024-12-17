import { ADD_COURSE, CLEAR_CORRECTION, CLEAR_TEST, GET_QUESTIONS, UPDATE_CORRECTION, UPDATE_SELECTED_OPTIONS, UPDATE_TEST, UPDATE_USER_AUTH_DETAILS } from "../constants/constants";


const initialState = {
    questions: [],

}



const midReducer = (state = initialState, action) => {
    const { type, questions, } = action;

    switch (type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions,
            };

        default:
            return state;
    }
};

export default midReducer;