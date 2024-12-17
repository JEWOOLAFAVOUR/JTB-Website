// import jwtDecode from 'jwt-decode';
// import { NavigationActions } from 'react-navigation';
import { logoutUser, updateUserAccessToken } from '../actions/authAction';

export const checkTokenExpiration = ({ dispatch, getState }) => next => action => {
    // if (action.type === 'UPDATE_USER_ACCESS_TOKEN') {
    //     const token = action.accessToken;
    //     const decoded = jwtDecode(token);
    //     console.log('Decoded token:', token); // Add this line
    //     const expirationTime = decoded.exp * 1000; // convert to milliseconds

    //     // Check if the token has expired
    //     if (expirationTime < Date.now()) {
    //         dispatch(logoutUser());
    //         const resetAction = NavigationActions.reset({
    //             index: 0,
    //             actions: [NavigationActions.navigate({ routeName: 'Login' })],
    //         });
    //         dispatch(resetAction);
    //         return;
    //     }

    //     // Update the token in the Axios instance and the Redux store
    //     // dispatch(updateUserAccessToken(token));
    // }

    return next(action);
};


