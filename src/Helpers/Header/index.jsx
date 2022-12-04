import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.headercontainer}>
      <img src="/Images/logo.svg" alt="logo" />
      <div className={style.buttonwrapper}>
        <Link to="/schedule">
          <img src="/Images/schedule.png" alt="" /> Schedule
        </Link>
        <Link to="/leaderboard">
          <img src="/Images/leaderboard.png" alt="" /> Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default Header;
