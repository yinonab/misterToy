import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'

import { ToyFilter } from '../cmps/ToyFilter'

import { ToyList } from '../cmps/ToyList'
import { toyService } from '../services/toy.service'
import { FILTER_TODO } from '../store/reducers/toy.reducer'


export function ToyIndex(){
    const dispatch = useDispatch()
    const { toys } = useSelector(storeState => storeState.toyModule)
    const filterBy  = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        console.log('filterBy:', filterBy)
        loadToys()
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Cannot load toys')
        })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onSetFilter(filterBy) {
        dispatch({ type: FILTER_TODO, filterBy })
    }

    
    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }

    return(
        <div>
            <h3>Toys App</h3>
            <main>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
                <button onClick={onAddToy}>add Toy 🧸</button>

                <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
                />
            </main>
        </div>
    )
}