import { userConstants } from '../actions/actionTypes';
import { userService } from '../user.service';
import { history } from '../helpers/history'

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
                    localStorage.setItem('user', JSON.stringify(result.user))
                    dispatch(success());
                    history.push('/');
                } else if (result.userAdded === false) {
                    let error = "Username exists."
                    dispatch(failure(error))
                    history.push('/');
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
                if (result.login === true) {
                    localStorage.setItem('user', JSON.stringify(result.user))
                    dispatch(success());
                    history.push('/');
                } else if (result.login === false) {
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
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload:error } }
}

function logout() {
    return { type: userConstants.LOGOUT}
}