import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import styles from "./AdminHome.module.scss";
import MainLogo from "../../../assets/Main_Logo.png";
import axios from "../../../axios";

const useAnimatedNumber = (targetNumber, duration = 1000) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    let start = null;
    let startNumber = 0;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1); // Ограничиваем от 0 до 1
      const easeOutPercentage = percentage * (2 - percentage); // ease-out эффект

      setCurrentNumber(
        Math.floor(startNumber + (targetNumber - startNumber) * easeOutPercentage)
      );

      if (percentage < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [targetNumber, duration]);

  return currentNumber;
};

const AdminHome = () => {
  const [stats, setStats] = useState({
    countUsers: 0,
    countUnmarkedTasks: 0,
    countTasks: 0,
  });

  const animatedUsers = useAnimatedNumber(stats.countUsers);
  const animatedUnmarkedTasks = useAnimatedNumber(stats.countUnmarkedTasks);
  const animatedTasks = useAnimatedNumber(stats.countTasks);

  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "BIA Technologies.";
  const typingSpeed = 100;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/admin-get-main-stats");
        setStats(data);
      } catch (error) {
        console.error("Ошибка при загрузке статистики:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        setTimeout(() => {
          setShowCursor(false);
        }, 1000);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <main>
        <div className={styles.info}>
          <h1 className={styles.typingEffect}>
            {typedText.startsWith("BIA") && (
              <>
                BIA
                <br />
              </>
            )}
            {typedText.slice(typedText.indexOf(" ") + 1)}
            {showCursor && (
              <span
                className={`${styles.cursor} ${
                  isTypingComplete ? styles.blinkCursor : ""
                }`}
              />
            )}
          </h1>
          <p>Платформа для проверки тестовых заданий<br />на языке 1С.</p>
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
              <h2>{animatedUsers}</h2>
              <p>Кандидатов</p>
            </div>
            <div>
              <h2>{animatedUnmarkedTasks}</h2>
              <p>Заданий на проверке</p>
            </div>
            <div>
              <h2>{animatedTasks}</h2>
              <p>Заданий в базе</p>
            </div>
          </div>
        </div>
        <img src={MainLogo} alt="Main User Page Logo" draggable="false" />
      </main>
      <Footer />
    </div>
  );
};

export default AdminHome;
