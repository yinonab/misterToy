import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'
import { ToyFilter } from '../cmps/ToyFilter'

export function ToyIndex(){
    const { toys } = useSelector(storeState => storeState.toyModule)
    const { filterBy } = useSelector(storeState => storeState.todoModule)

    useEffect(() => {
        loadToys()
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
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    
    function onEditToy(toy) {
        const price = +prompt('New price?', car.price)
        const toyToSave = { ...car, price }
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
            </main>
        </div>
    )
}