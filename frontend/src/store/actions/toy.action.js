import { toyService } from "../../services/toy.service";
import { REMOVE_TOY, SET_TOYS } from "../reducers/toy.reducer";
import { store } from "../store";


export function loadToys() {
    
    toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
            console.log('toys', toys);
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