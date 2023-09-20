import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>
                        <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className="edit-btn" onClick={() => onEditToy(toy)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </li>
            )}
        </ul>
    )
}
