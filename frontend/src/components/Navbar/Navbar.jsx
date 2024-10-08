import { useNavigate } from "react-router-dom";
import map from "./assets/map.svg";
import medicine from "./assets/medicine.svg";
import news from "./assets/news.svg";
import building from "./assets/building.svg";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="align-middle shadow-inner flex items-center justify-around  p-4">
      <button
        onClick={() => navigate("/")}
        className="hover:scale-110 transition-transform"
      >
        <img src={map} alt="Map" />
      </button>
      <button
        onClick={() => navigate("/news")}
        className="hover:scale-110 transition-transform"
      >
        <img src={news} alt="Medicine" />
      </button>
      <button
        onClick={() => navigate("/medicine")}
        className="hover:scale-110 transition-transform"
      >
        <img src={medicine} alt="News" />
      </button>
      <button
        onClick={() => navigate("/camps")}
        className="hover:scale-110 transition-transform"
      >
        <img src={building} alt="Building" />
      </button>
    </div>
  );
}

export default Navbar;
