import React from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderMain.module.scss";
import { logout, selectIsAuth } from "../../redux/slices/auth";
const HeaderMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      navigate("/login");
    }
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
            <a href="https://bia-tech.ru/?utm_referrer=https%3A%2F%2Fwww.google.com%2F">Наш сайт</a>
          </li>
          <li>
            <a href="mailto:VCP@mail.ru&body=...&subject=[ОЭ'2024]{{ url + userId }}">Поддержка</a>
          </li>
        </ul>
      </nav>
      <Link to="/login" className={styles.button}>
        ВОЙТИ
      </Link>
    </header>
  );
};

export default HeaderMain;

//add active clicks on LINKS
