import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// List of toy icons
const toyIcons = ["🧸", "🚗","🎨","🎆","🌞","☔","⚡","🎌","🗼","🗽","🛴","🛵","🚍","🚋","🦼","🚖","🚜","🦽","🕋","🚲","⛑","🏈","🎱","⛳","💎","👑","⚽","👓","🏏","🤿","🎣","🏐","🏀","🥎","🏉", "🎲", "🎮", "🎯", /* Add more toy icons here */];

export function ToyPreview({ toy, onRemoveToy, onEditToy }) {
  // State to hold the current toy icon
  const [currentToyIcon, setCurrentToyIcon] = useState("");

  // Function to update the toy icon with a random one
  const updateToyIcon = () => {
    const randomIndex = Math.floor(Math.random() * toyIcons.length);
    const randomToyIcon = toyIcons[randomIndex];
    setCurrentToyIcon(randomToyIcon);
  };

  // Use useEffect to set the initial toy icon and update it on component mount
  useEffect(() => {
    updateToyIcon();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <article className="toy-article">
      <h4 className="toy-name">{toy.name}</h4>
      <h1 className="toy-emoji">{currentToyIcon}</h1>
      <h5 className={`toy-status-details ${toy.inStock ? "in-stock" : "out-of-stock"}`}>
        Status:<br/> {toy.inStock ? "In Stock" : "Out of Stock"}
      </h5>

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
  );
}
