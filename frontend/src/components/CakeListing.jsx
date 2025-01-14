function CakeListing({ entries, addToCart }) {
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {entries.map((entry, index) => (
          <li key={index}>
            <div className="cake__img">
              {/* Add a image tag here once you have a img url but for now using <p> to diplay text */}
              <p>{entry.imageUrl}</p>
            </div>
            <p>Name: {entry.name}</p>
            <p>Description: {entry.description}</p>
            <p>Price: ${entry.price}</p>
            <button onClick={() => addToCart(entry)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CakeListing;
