import { toyService } from "../../services/toy.service";
import { ADD_TOY, REMOVE_TOY, SET_FILTER, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer";
import { store } from "../store";


export function loadToys() {
    const { filterBy } = store.getState().toyModule
    // console.log('filterBy', filterBy)
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setToyFilter(filterBy = toyService.getDefaultFilter()) {
    
    // dispatch
    store.dispatch({type: SET_FILTER, filterBy})
    return Promise.resolve(filterBy)
    // return loadToys()
}