import { Link } from "react-router-dom"

export function ToyPreview({ toy ,onRemoveToy,onEditToy }) {
    return (
        <article className="toy-article">
            <h4 className="toy-name">{toy.name}</h4>
            <h1 className="toy-emoji">🧸</h1>
            <p className="toy-price">Price: <span>${toy.price.toLocaleString()}</span></p>
            <div>
                <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button className="edit-btn" onClick={() => onEditToy(toy)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
            <br />
            <Link className="toy-details" to={`/toy/${toy._id}`}>Details</Link>
            
        </article>
    )
}