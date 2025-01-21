import "./cakelisting.css";

function CakeListing({ entries, addToCart, user }) {
  return (
    <div className="cake-listing">
      {entries.map((entry, index) => (
        <div className="cake-card" key={index}>
          <img
            src={entry.imageUrl}
            alt={entry.name}
            className="cake-card__image"
          />
          <div className="cake-card__details">
            <h3 className="cake-card__name">{entry.name}</h3>
            <p className="cake-card__description">{entry.description}</p>
            <p className="cake-card__price">${entry.price}</p>
            <button
              className="cake-card__button"
              onClick={() => user && addToCart(entry)}
              disabled={!user}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CakeListing;
