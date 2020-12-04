import { petConstants } from './pets.actionTypes';
import { petService } from './pets.service';

export const petActions = {
    fetchPets,
    addPet,
    deletePet,
    fetchSinglePet,
    editPet
}

function fetchPets(user) {
    return dispatch => {
        petService.fetchPets(user)
        .then(
            result => {
              dispatch(success(result))
            },
            error => {
              dispatch(failure(error))  
            }
        )
    }

    function success(pets) { return { type: petConstants.PETS_FETCHED, payload: pets } }
    function failure(error) { return { type: petConstants.PETS_FETCHED_FAILED, payload: error } }
}

function fetchSinglePet(id) {
    return dispatch => {
        petService.fetchSinglePet(id)
        .then(
            result => {
                dispatch(success(result))
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success(result) { return { type: petConstants.SINGLE_PET_FETCHED, payload: result } }
    function failure(error) { return { type: petConstants.SINGLE_FETCH_FAIL, payload: error } }
}

function addPet(pet) {
    return dispatch => {
        petService.addPet(pet)
        .then(
            result => {
                dispatch(success(result))
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success(result) { return { type: petConstants.PET_ADDED, payload: result } }
    function failure(error) { return { type: petConstants.PET_ADD_FAIL, payload: error } }
}

function deletePet(pet) {
    return dispatch => {
        petService.deletePet(pet).then(
            result => {
                dispatch(success(result))
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success(result) { return { type: petConstants.PET_DELETED, payload: result } }
    function failure(error) { return { type: petConstants.PET_DELETE_FAIL, payload: error } }
}

function editPet(pet) {
    return dispatch => {
        petService.editPet(pet)
        .then(
            result => {
                dispatch(success(result))
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success(result) { return { type: petConstants.PET_EDITED, payload: result } }
    function failure(error) { return { type: petConstants.PET_EDIT_FAIL, payload: error } }
}