// Main/index.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import styles from "./AdminHome.module.scss";
import MainLogo from "../../../assets/Main_Logo.png";

const AdminHome = () => {
  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <main>
        <div className={styles.info}>
          <h1>BIA Technologies.</h1>
          <p>Платформа для проверки тестовых заданий<br></br>на языке 1С.</p>
          <div className={styles.actions}>
            <Link to="/admin/bdresults" className={styles.buttonResults}>
              решения
            </Link>
            <Link to="/admin/bdcandidates" className={styles.buttonCandidates}>
              кандидаты
            </Link>
          </div>
          <div className={styles.stats}>
            <div>
              <h2>19</h2>
              <p>Кандидатов</p>
            </div>
            <div>
              <h2>15</h2>
              <p>Заданий на проверке</p>
            </div>
            <div>
              <h2>60</h2>
              <p>Заданий в базе</p>
            </div>
          </div>
        </div>
        <img src={MainLogo} alt="Main User Page Logo" />
      </main>
      <Footer />
    </div>
  );
};

export default AdminHome;