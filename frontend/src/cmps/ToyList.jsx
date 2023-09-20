import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button className="edit-btn" onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </li>
            )}
        </ul>
    )
}
