import { petConstants } from '../actions/pets.actionTypes';

const allPetsReducer = (state = {}, action) => {

    switch(action.type) {
        case petConstants.PETS_FETCHED:
            return {
                pets: action.payload
            }
        case petConstants.PETS_FETCHED_FAILED:
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

const singlePetReducer = (state = {}, action) => {

    switch(action.type) {
        case petConstants.SINGLE_PET_FETCHED:
            return {
                pet: action.payload
            }
        case petConstants.SINGLE_FETCH_FAIL:
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

const addPetReducer = (state = {}, action) => {
    switch(action.type) {
        case petConstants.PET_ADDED:
            return {
                ...state,
                added: true
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

const deletePetReducer = (state = {}, action) => {
    switch(action.type) {
        case petConstants.PET_DELETED:
            return {
                ...state,
                deleted: action.payload
            }
        case petConstants.PET_DELETE_FAIL:
            return {
                state
            }
        default:
            return {
                state
            }
    }

}

const editPetReducer = (state = {}, action) => {
    switch(action.type) {
        case petConstants.PET_EDITED:
            return {
                pet: action.payload
            }
        case petConstants.PET_EDIT_FAIL:
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

export { allPetsReducer, singlePetReducer, addPetReducer, deletePetReducer, editPetReducer };