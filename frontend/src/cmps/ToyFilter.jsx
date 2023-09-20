import { useSelector } from "react-redux";


export function ToyFilter({ filterBy,onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    onSetFilter = useRef(utilService.debounce(onSetFilter))
    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    if (!filterBy) return <div>loading</div>
    const { txt, inStock, } = filterBy
    return (
        <section className="todo-filter">
            <h2>Filter Our Toys</h2>
            <form >

                <div className="filter-group">
                    <label htmlFor="txt">Title: </label>
                    <input value={txt} onChange={handleChange} type="text" placeholder="By txt" id="txt" name="txt" />
                </div>
                <div className="filter-group">
                    <label htmlFor="todos">FIlter By:</label>
                    <select value={inStock} name="inStock" id="inStock" onChange={handleChange}>
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