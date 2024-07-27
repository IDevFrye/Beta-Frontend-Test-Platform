import React from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderAdmin.module.scss";
import { logout, selectIsAuth } from "../../redux/slices/auth";

const HeaderMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <img src={logo} alt="BIA Logo" />
      <nav>
        <ul>
          <li className={isActive("/adminhome") ? styles.active : ""}>
            <Link to="/adminhome">Главная</Link>
          </li>
          <li className={isActive("/admin/bdcandidates") ? styles.active : ""}>
            <Link to="/admin/bdcandidates">Кандидаты</Link>
          </li>
          <li className={isActive("/admin/bdtasks") ? styles.active : ""}>
            <Link to="/admin/bdtasks">Задания</Link>
          </li>
          <li className={isActive("/admin/bdresults") || isActive("/admin/bdresult") ? styles.active : ""}>
            <Link to="/admin/bdresults">Проверка</Link>
          </li>
        </ul>
      </nav>
      <button onClick={onClickLogout} className={styles.button}>
        ВЫЙТИ
      </button>
    </header>
  );
};

export default HeaderMain;
