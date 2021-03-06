import { userConstants } from './user.actionTypes';
import { userService } from './user.service';
import history from '../../utils/history';
import { setAuthenticationHeader } from '../../utils/authenticate';

export const userActions = {
    register,
    login,
    logout
}

function register(user) {
    return dispatch => {
        userService.register(user)
        .then(
            result => {
                if (result.userAdded === true) {
                    dispatch(success(result.user));
                    history.push('/dashboard');
                } else if (result.userAdded === false) {
                    let error = "Username exists."
                    dispatch(failure(error))
                }
            },
            error => {
                dispatch(failure(error));
            }
        )
    }

    function success(user) { return { type: userConstants.REGISTER_SUCCESS, payload: user} }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, payload: error } }
}

function login(user) {
    return dispatch => {
        userService.login(user)
        .then(
            result => {
                if (result.data.login === true) {
                    const token = result.data.token;
                    localStorage.setItem('jsonwebtoken', token);
                    setAuthenticationHeader(token);
                    dispatch(success(result.data.user));
                    history.push('/dashboard');
                } else if (result.data.login === false) {
                    let error = "Username does not exist.";
                    dispatch(failure(error));
                }
            },
            error => {
                dispatch(failure(error));
            }
        );
    };
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload: user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload: error } }
}

function logout() {
    return { type: userConstants.LOGOUT}
}