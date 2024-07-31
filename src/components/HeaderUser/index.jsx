import React from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderUser.module.scss";
import { logout, selectIsAuth } from "../../redux/slices/auth";

const HeaderUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <img src={logo} alt="BIA Logo" />
      <nav>
        <ul>
          <li className={isActive("/userhome") ? styles.active : ""}>
            <Link to="/userhome">Главная</Link>
          </li>
          <li className={isActive("/userprofile") ||isActive("/usertask")||isActive("/userresult") ? styles.active : ""}>
            <Link to="/userprofile">Профиль</Link>
          </li>
          <li>
            <a href="mailto:VCP@mail.ru&body=...&subject=[ОЭ'2024]{{ url + userId }}">Поддержка</a>
          </li>
        </ul>
      </nav>
      <button onClick={onClickLogout} className={styles.button}>
        ВЫЙТИ
      </button>
    </header>
  );
};

export default HeaderUser;
