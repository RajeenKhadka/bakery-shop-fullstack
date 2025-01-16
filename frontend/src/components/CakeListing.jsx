// components/CakeListing.jsx

function CakeListing({ entries, addToCart, user }) {
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {entries.map((entry, index) => (
          <li key={index}>
            <div className="cake__img">
              {/* Add an image tag here once you have an img URL */}
              <p>{entry.imageUrl}</p>
            </div>
            <p>Name: {entry.name}</p>
            <p>Description: {entry.description}</p>
            <p>Price: ${entry.price}</p>
            <button
              onClick={() => {
                if (user) {
                  addToCart(entry); // Add to cart only if the user is logged in
                }
              }}
              disabled={!user} // Disable the button if user is not logged in
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CakeListing;
