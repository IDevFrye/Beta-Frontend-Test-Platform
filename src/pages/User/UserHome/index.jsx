import React from "react";
import styles from "./UserHome.module.scss";
import HeaderMain from "../../../components/HeaderMain";
import MainLogo from "../../../assets/Main_Logo.png";
import FooterLogo from "../../../assets/Footer_Logo.png";
import { Link } from "react-router-dom";
const UserHome = () => {
  return (
    <>
      <div className={styles.container}>
        <HeaderMain />
        <main>
          <div className={styles.info}>
            <h1>BIA Technologies.</h1>
            <p>Платформа для проверки тестовых заданий на языке 1С.</p>
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
      </div>
      <footer>
        <div className={styles.about}>
          <img src={FooterLogo} alt="Footer BIA Logo" />
          <nav>
            <ul>
              <li>
                <a href="#">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="#">О компании</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default UserHome;
