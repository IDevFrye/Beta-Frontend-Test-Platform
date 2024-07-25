// Main/index.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeaderMain from "../../components/HeaderMain";
import Footer from "../../components/Footer";
import styles from "./Main.module.scss";
import MainLogo from "../../assets/Main_Logo.png";

const Main = () => {
  return (
    <div className={styles.container}>
      <HeaderMain />
      <main>
        <div className={styles.info}>
          <h1>BIA Technologies.</h1>
          <p>Платформа для проверки тестовых заданий<br></br>на языке 1С.</p>
          <div className={styles.actions}>
            <Link to="/register" className={styles.buttonRegister}>
              Регистрация
            </Link>
            <Link to="/login" className={styles.buttonLogin}>
              Войти
            </Link>
          </div>
        </div>
        <img src={MainLogo} alt="Main User Page Logo" />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
