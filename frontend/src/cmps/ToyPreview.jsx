import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
    return (
        <article className="toy-article">
            <h4 className="toy-name">{toy.name}</h4>
            <h1 className="toy-emoji">🧸</h1>
            <p className="toy-price">Price: <span>${toy.price.toLocaleString()}</span></p>
            <hr />
            <Link className="toy-details" to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}