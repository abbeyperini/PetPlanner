import { petConstants } from './pets.actionTypes';
import { petService } from './pets.service';

export const petActions = {
    fetchPets,
    addPet
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

function addPet(pet) {
    return dispatch => {
        petService.addPet(pet)
        .then(
            result => {
                console.log(result)
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