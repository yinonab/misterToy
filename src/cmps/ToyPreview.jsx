import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { saveToy } from '../store/actions/toy.action'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


// List of toy icons
// const toyIcons = ["🧸", "🚗","🎨","🎆","🌞","☔","⚡","🎌","🗼","🗽","🛴","🛵","🚍","🚋","🦼","🚖","🚜","🦽","🕋","🚲","⛑","🏈","🎱","⛳","💎","👑","⚽","👓","🏏","🤿","🎣","🏐","🏀","🥎","🏉", "🎲", "🎮", "🎯", /* Add more toy icons here */]

export function ToyPreview({ toy, onRemoveToy, onEditToy }) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingPrice, setIsEditingPrice] = useState(false)
  const [editedName, setEditedName] = useState(toy.name)
  const [editedPrice, setEditedPrice] = useState(toy.price)

  const handleNameClick = () => {
    setIsEditingName(true)
  }

  const handlePriceClick = () => {
    setIsEditingPrice(true)
  }

  const handleBlur = () => {
    setIsEditingName(false)
    setIsEditingPrice(false)

    // Save changes to the database
    if (editedName !== toy.name || editedPrice !== toy.price) {
      const toyToSave = { ...toy, name: editedName, price: editedPrice }
      saveToy(toyToSave)
        .then((savedToy) => {
          showSuccessMsg(`Toy updated: $${savedToy.name}`)
          console.log(`Toy updated to name: ${savedToy.name}, price: $${savedToy.name}`)
        })
        .catch((err) => {
          showErrorMsg('Cannot update toy')
          console.error("Cannot update toy", err)
        })
    }
  }


  const handleNameChange = (e) => {
    setEditedName(e.target.value)
  }

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value)
  }
  const toggleInStock = () => {
    const updatedToy = { ...toy, inStock: !toy.inStock };
    saveToy(updatedToy);
    showSuccessMsg(`Toy updated to price: $${updatedToy._id}`)
  }





  return (
    <article className="toy-article">
      <h4 className="toy-name">
        {isEditingName ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleBlur}
          />
        ) : (
          <span onClick={handleNameClick}>{editedName}</span>
        )}
      </h4>




      <h1 className="toy-emoji">{toy.icon}</h1>
      <h5
        className={`toy-status-details ${toy.inStock ? "in-stock" : "out-of-stock"
          }`}
        onClick={toggleInStock} // Add the onClick handler to toggle inStock
      >
        Status: {toy.inStock ? "In Stock" : "Out of Stock"}
      </h5>


      <p className="toy-price">
        {isEditingPrice ? (
          <input
            type="number"
            value={editedPrice}
            onChange={handlePriceChange}
            onBlur={handleBlur}
          />
        ) : (
          <span onClick={handlePriceClick}>${editedPrice.toLocaleString()}</span>
        )}
      </p>



      <div>
        <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
        {/* <button className="edit-btn" onClick={() => onEditToy(toy)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button> */}
      </div>
      <br />
      <Link className="toy-details" to={`/toy/${toy._id}`}>Details</Link>
    </article>
  )
}
