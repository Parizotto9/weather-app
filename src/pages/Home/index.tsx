import style from "./Home.module.scss";
import { Link } from "react-router-dom";

export default function Catalog() {
  const citties = ["dallol", "fairbanks", "london", "recife", "vancouver", "yakutsk"];
  document.body.id = "";

  return (
    <div className={style.page}>
      <h1>Weather</h1>
      <h3>select a city</h3>
      <div className={style.image}></div>
      <div className={style.citties}>
        {citties.map((city, ind) => {
          return (
            <Link className={style.city} key={ind} to={`/city/${city}`}>
              {city}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
