import { toyService } from "../../services/toy.service";
import { SET_TOYS } from "../reducers/toy.reducer";


export function loadToys() {
    
    toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
            console.log('toys', toys);
        })
}