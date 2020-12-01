import { userConstants } from './actions/actionTypes';

const initialState = {
    login: false,
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                login: true,
                user: action.payload
            }
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                login: false
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                login: true
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                login: false
            };
        default:
            return state
    }
}

export default reducer;