import { UPDATE_ONBOARDING_STATUS, UPDATE_USER_LOGIN, UPDATE_USER_ACCESS_TOKEN, LOGOUT_USER, UPDATE_LOGGED_IN_STATUS } from "../constants/constants";

const initialState = {
    isOnboardingDisabled: false,
    isLoggedIn: false,
    user: {},
    token: "",
}



const authReducer = (state = initialState, action) => {
    const { status, type, isLoggedIn, user, token, } = action;

    switch (type) {
        case UPDATE_ONBOARDING_STATUS:
            return {
                ...state, isOnboardingDisabled: status
            };
        case UPDATE_USER_LOGIN:
            return {
                ...state, user,
            };
        case UPDATE_LOGGED_IN_STATUS:
            return {
                ...state, isLoggedIn
            };

        case UPDATE_USER_ACCESS_TOKEN:
            return {
                ...state, token
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                token: "",
            };

        default:
            return state;
    }
}

export default authReducer;