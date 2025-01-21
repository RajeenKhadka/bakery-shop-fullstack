import "./home.css";
import { Link } from "react-router";

function Home() {
  return (
    <>
      <section className="home section" id="home">
        <div className="home__container">
          <div className="home__banner">
            <img
              src="https://res.cloudinary.com/dexeqks1w/image/upload/v1737323546/IMG_9430_dxzdrg.jpg"
              alt="Cake Image"
              className="banner-img"
            />
            <div className="banner-content">
              <h1 className="home__title">
                Delicious Cakes for Every Occasion
              </h1>

              <Link to="/menu">
                <button className="home__cta">Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
