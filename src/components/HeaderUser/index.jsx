import React from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderUser.module.scss";
import { logout, selectIsAuth } from "../../redux/slices/auth";
const HeaderUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <header>
      <img src={logo} alt="BIA Logo" />
      <nav>
        <ul>
          <li>
            <Link to="/userhome">Главная</Link>
          </li>
          <li>
            <Link to="/userprofile">Профиль</Link>
          </li>
          <li>
            <a href="mailto:VCP@mail.ru&body=...&subject=[ОЭ'2024]{{ url + userId }}">Поддержка</a>
          </li>
        </ul>
      </nav>
      <Link to="/" className={styles.button}>
        ВЫЙТИ
      </Link>
    </header>
  );
};

export default HeaderUser;