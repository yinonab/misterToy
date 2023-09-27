import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadToys, removeToy, saveToy, setToyFilter } from '../store/actions/toy.action'

import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'

import { toyService } from '../services/toy.service'


export function ToyIndex() {
    const { toys } = useSelector(storeState => storeState.toyModule)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const displayedToys = toys.slice(startIndex, endIndex)

    useEffect(() => {
        // console.log('filterBy:', filterBy)
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg(`toy ${toyId} removed`)
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
        setToyFilter(filterBy)
        setCurrentPage(0)
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
    // if (!toys.length) return <div className="center-spinner"> <div className="lds-facebook"><div></div><div></div><div></div></div></div>
    return (
        <div className="div-container">
            {/* <h3 className="custom-h3">Toys App</h3> */}
            <main className="custom-main">
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <button className="btn add-toy" onClick={onAddToy}>add Toy 🧸</button>
                <ToyList
                    toys={displayedToys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                />
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={Math.ceil(toys.length / itemsPerPage)}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </main>
        </div>
    )
}