import { useState, useRef, useEffect } from "react"
import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"


const toyLabels = toyService.getToyLabels()

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))
    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (field === 'inStock' && value === '') {
            value = ''
        } else if (type === 'select-one') {
            value = value === 'true'
        } else if (type === 'number') {
            value = +value || ''
        } else if (type === 'select-multiple') {
            value = Array.from(target.selectedOptions, (option) => option.value)
            // console.log('value', value)
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    if (!filterBy) return <div>loading</div>
    return (
        <section className="todo-filter">
            <h2>Filter Our Toys</h2>
            <form >

                <div className="filter-group">
                    <label htmlFor="txt">Filter By Name: </label>
                    <input value={filterByToEdit.txt} onChange={handleChange} type="txt" placeholder="By txt" id="txt" name="txt" />
                </div>
                <div className="filter-group">
                    <label htmlFor="inStock">Filter By Stock Available:</label>
                    <select value={filterByToEdit.inStock} name="inStock" id="inStock" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Out Of Stock</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="toys">FIlter By Label:</label>
                    <select multiple value={filterByToEdit.labels} name="labels" id="labels" onChange={handleChange}>
                        <option value="">All</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </>
                    </select>
                </div>
            </form>
        </section>
    )
}