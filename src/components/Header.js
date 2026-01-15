import { logo } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btcontent, setBtcontent] = useState("Login");

  useEffect(() => {
    console.log("useEffect called");
  });

  console.log("Header rendered");

  return (
    <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-yellow-50 md:bg-green-50 lg:bg-blue-50">
      <div>
        <img className="w-50 " src={logo} />
      </div>
      <h1 className="site-title">Flavor Junction</h1>
      <div className="nav-items">
        <ul>
          <li>
            Online Status : {useOnlineStatus() ? "✅ " : "🔴 "}
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>Cart</li>
          <button
            className="login-btn"
            onClick={() => {
              if (btcontent === "Logout") setBtcontent("Login");
              else setBtcontent("Logout");
            }}
          >
            {btcontent}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
