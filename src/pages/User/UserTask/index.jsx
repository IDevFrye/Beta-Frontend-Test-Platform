import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Footer from "../../../components/Footer";
import HeaderMain from "../../../components/HeaderMain";
import Console from "../../../components/BSLConsole";
import styles from "./UserTask.module.scss";
import accuracyTick from "../../../assets/icons/accuracy-tick.svg";
import Errors from "../../../assets/icons/errors.svg";
import Vulnerables from "../../../assets/icons/vulnerables.svg";
import Defects from "../../../assets/icons/defects.svg";
const UserTask = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [task, setTask] = useState(null);
  const { taskNumber } = useParams();
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
    }
  }, []);
  useEffect(() => {
    if (userId) {
      const fetchTask = async () => {
        try {
          const response = await fetch(`/task/${taskNumber}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const taskData = await response.json();
          setTask(taskData);
        } catch (error) {
          console.error("Fetch task failed:", error);
        }
      };

      fetchTask();

      axios
        .get(`/user-task-getDone/${userId}/${taskNumber}`)
        .then((response) => {
          setIsSubmitted(response.data); // Проверяем, равно ли поле done 1
        })
        .catch((error) => console.error(error));
    }
  }, [taskNumber, userId]);

  if (!task) return null;

  const handleFinish = () => {
    navigate("/tasks");
  };
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
              <h4>
                <img src={accuracyTick} alt="Accuracy icon" /> Корректнось
              </h4>
            </div>
            <div className={styles.warnings}>
              <h4>
                <img src={Errors} alt="Error icon" /> Ошибки
              </h4>
              <h4>
                <img src={Vulnerables} alt="Vulnerable icon" /> Уязвимости
              </h4>
              <h4>
                <img src={Defects} alt="Defect icon" /> Дефекты
              </h4>
            </div>
            <div className={styles.mark}>-/10</div>
            <button>Отправить решение</button>
          </section>
          <section className={styles.console}>
            {isSubmitted === 0 ? (
              <Console userId={userId} taskNumber={taskNumber} />
            ) : (
              <div>
                <p>Решение успешно отправлено!</p>
                <button onClick={handleFinish}>Завершить</button>
              </div>
            )}
          </section>
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UserTask;
