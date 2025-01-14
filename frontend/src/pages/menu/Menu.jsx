import axios from "axios";
import { useEffect, useState } from "react";
import CakeListing from "../../components/CakeListing";

function Menu({ addToCart }) {
  const [entries, setEntries] = useState([]);
  const LOCAL_URL = "http://localhost:5052";

  // Fetch cake entries from the backend
  const getEntries = async () => {
    try {
      const response = await axios.get(`${LOCAL_URL}/api/cakes`);
      setEntries(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      {entries.length > 0 ? (
        <CakeListing entries={entries} addToCart={addToCart} />
      ) : (
        <h1>No cake entries...</h1>
      )}
    </div>
  );
}

export default Menu;
