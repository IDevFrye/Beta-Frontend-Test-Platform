import React, { useState } from "react";
import Footer from "../../../components/Footer";
import HeaderMain from "../../../components/HeaderMain";
import styles from "./UserTask.module.scss";
import accuracyTick from "../../../assets/icons/accuracy-tick.svg"
import Errors from "../../../assets/icons/errors.svg";
import Vulnerables from "../../../assets/icons/vulnerables.svg";
import Defects from "../../../assets/icons/defects.svg";
const UserTask = () => {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      <div className={styles.container}>
        <HeaderMain isAuth={isAuth} />
        <main>
          <section className={styles.task}>
            <h1>Решение</h1>
            <h3>
              Задание №100 <br />
              Сергеев Антон Игоревич
            </h3>
            <p>
              Выдано: 19.05.2024/14:00 <br />
              Отправлено: -
            </p>
            <div className={styles.accuracy}>
              <h4><img src={accuracyTick} alt="Accuracy icon" /> Корректнось</h4>
            </div>
            <div className={styles.warnings}>
              <h4><img src={Errors} alt="Error icon" /> Ошибки</h4>
              <h4><img src={Vulnerables} alt="Vulnerable icon" /> Уязвимости</h4>
              <h4><img src={Defects} alt="Defect icon" /> Дефекты</h4>
            </div>
            <div className={styles.mark}>
              -/10
            </div>
            <button>Отправить решение</button>
          </section>
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UserTask;
