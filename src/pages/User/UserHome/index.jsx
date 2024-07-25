// Main/index.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeaderUser from "../../../components/HeaderUser";
import Footer from "../../../components/Footer";
import styles from "./UserHome.module.scss";
import MainLogo from "../../../assets/Main_Logo.png";

const UserHome = () => {
  return (
    <div className={styles.container}>
      <HeaderUser />
      <main>
        <div className={styles.info}>
          <h1>BIA Technologies.</h1>
          <p>Платформа для проверки тестовых заданий<br></br>на языке 1С.</p>
          <div className={styles.actions}>
            <Link to="/userprofile" className={styles.buttonProfile}>
              Перейти в личный кабинет
            </Link>
          </div>
        </div>
        <img src={MainLogo} alt="Main User Page Logo" />
      </main>
      <Footer />
    </div>
  );
};

export default UserHome;