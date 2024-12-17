import { ADD_COURSE, CLEAR_CORRECTION, CLEAR_TEST, GET_QUESTIONS, UPDATE_CORRECTION, UPDATE_SELECTED_OPTIONS, UPDATE_TEST, UPDATE_USER_AUTH_DETAILS } from "../constants/constants"

export const updateUserAuthDetails = (userAuth) => {
    return {
        type: UPDATE_USER_AUTH_DETAILS,
        userAuth,
    }
}

export const updateQuestion = (questions) => {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}

export const updateAddCourse = (addCourse) => {
    return {
        type: ADD_COURSE,
        addCourse,
    }
}

export const updateTest = (test) => {
    return {
        type: UPDATE_TEST,
        test,
    }
}

export const updateSelectedOptions = (selectedOptions) => ({
    type: UPDATE_SELECTED_OPTIONS,
    selectedOptions,
});


export const updateCorrection = (correctionData) => ({
    type: UPDATE_CORRECTION,
    correctionData,
});


export const clearCorrection = () => ({
    type: CLEAR_CORRECTION,
});



export const handleClearTest = () => ({
    type: CLEAR_TEST,
});

