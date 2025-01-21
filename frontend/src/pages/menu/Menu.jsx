import "./menu.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CakeListing from "../../components/CakeListing/CakeListing";

function Menu({ addToCart, user }) {
  const [entries, setEntries] = useState([]);
  const LOCAL_URL = "http://localhost:5052";

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
    <div className="menu">
      <h1 className="menu__title">Our Cakes</h1>
      {entries.length > 0 ? (
        <CakeListing entries={entries} addToCart={addToCart} user={user} />
      ) : (
        <h1 className="menu__empty">No cakes available...</h1>
      )}
    </div>
  );
}

export default Menu;
