import React from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./HeaderMain.module.scss";
const HeaderMain = ({ isAuth }) => {
  const navigate = useNavigate();
  const logOut = () => {
    alert("You've been logged out");
    navigate("/login");
  };
  return (
    <header>
      <img src={logo} alt="BIA Logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <a href="#">Наш сайт</a>
          </li>
          <li>
            <a href="#">Поддержка</a>
          </li>
        </ul>
      </nav>
      {isAuth ? (
        <button onClick={logOut} className={styles.button}>
          ВЫЙТИ
        </button>
      ) : (
        <Link to="/login" className={styles.button}>
          ВОЙТИ
        </Link>
      )}
    </header>
  );
};

export default HeaderMain;

//add active clicks on LINKS
