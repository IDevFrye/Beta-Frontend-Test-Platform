import React, { useState, useEffect } from "react";
import styles from "./UserHome.module.scss";
import HeaderMain from "../../../components/HeaderMain";
import MainLogo from "../../../assets/Main_Logo.png";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../../redux/slices/auth";
const UserHome = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
  console.log(isAuth);
  return (
    <>
      <div className={styles.container}>
        <HeaderMain isAuth={isAuth} />
        <main>
          <div className={styles.info}>
            <h1>BIA Technologies.</h1>
            <p>Платформа для проверки тестовых заданий на языке 1С.</p>
            <div className={styles.actions}>
              {isAuth ? (
                <Link to="/userprofile" className={styles.buttonProfile}>перейти в личный кабинет</Link>
              ) : (
                <>
                  <Link to="/register" className={styles.buttonRegister}>
                    Регистрация
                  </Link>
                  <Link to="/login" className={styles.buttonLogin}>
                    Войти
                  </Link>
                </>
              )}
            </div>
          </div>
          <img src={MainLogo} alt="Main User Page Logo" />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserHome;
