import React from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderAdmin.module.scss";
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
            <Link to="/adminhome">Главная</Link>
          </li>
          <li>
            <Link to="/admin/bdcandidates">Кандидаты</Link>
          </li>
          <li>
            <Link to="/admin/bdtasks">Задания</Link>
          </li>
          <li>
            <Link to="/admin/bdresults">Проверка</Link>
          </li>
        </ul>
      </nav>
      <Link to="/login" className={styles.button}>
        ВЫЙТИ
      </Link>
    </header>
  );
};

export default HeaderMain;

//add active clicks on LINKS