import { useState, useRef, useEffect } from "react"
import { utilService } from "../services/util.service"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))
    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        console.log('target:', target)
        console.log('value:', value)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    if (!filterBy) return <div>loading</div>
    return (
        <section className="todo-filter">
            <h2>Filter Our Toys</h2>
            <form >

                <div className="filter-group">
                    <label htmlFor="txt">Title: </label>
                    <input value={filterByToEdit.txt} onChange={handleChange} type="txt" placeholder="By txt" id="txt" name="txt" />
                </div>
                <div className="filter-group">
                    <label htmlFor="inStock">Filter By:</label>
                    <select value={filterByToEdit.inStock} name="inStock" id="inStock" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Out Of Stock</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="toys">FIlter By:</label>
                    <select multiple value={filterByToEdit.labels} name="labels" id="labels" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="On wheels">On wheels</option>
                        <option value="Box game">Box game</option>
                        <option value="Art">Art</option>
                        <option value="Baby">Baby</option>
                        <option value="Doll">Doll</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Battery Powered">Battery Powered</option>
                    </select>
                </div>
            </form>
        </section>
    )
}