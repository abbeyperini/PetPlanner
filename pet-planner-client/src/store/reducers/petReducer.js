import { petConstants } from '../actions/pets.actionTypes';

const initialState = {
    pets: []
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case petConstants.PETS_FETCHED:
            return {
                ...state,
                pets: action.payload
            }
        case petConstants.PETS_FETCHED_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case petConstants.PET_ADDED:
            return {
                state
            }
        case petConstants.PET_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return {
                state
            }
    }

}

export default reducer;