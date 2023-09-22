import React, { useState } from 'react';
import { ToyPreview } from './ToyPreview.jsx';
import _ from 'lodash'; // Import lodash

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const [sortBy, setSortBy] = useState(null); // Initialize sorting state
    const [sortOrder, setSortOrder] = useState('asc'); // Initialize sorting order state

    // Function to handle sorting by a specific criteria
    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            // If the same criteria is clicked again, toggle the sorting order
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // If a different criteria is clicked, update the sorting criteria and set it to ascending
            setSortBy(criteria);
            setSortOrder('asc');
        }
    };

    // Toggle sorting order (ascending/descending) when the checkbox is clicked
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Sort the toys array based on the current sorting criteria and order
    const sortedToys = _.orderBy(toys, sortBy, sortOrder);

    return (
        <div>
            <div className="sorting-buttons">
                <button className="btn-name-toy" onClick={() => handleSort('name')}>Sort by Name</button>
                <button className="btn-price-toy" onClick={() => handleSort('price')}>Sort by Price</button>
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={sortOrder === 'desc'}
                    onChange={toggleSortOrder}
                />
                Descending Order
            </label>
            <ul className="toy-list">
                {sortedToys.map((toy) => (
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
                ))}
            </ul>
        </div>
    );
}