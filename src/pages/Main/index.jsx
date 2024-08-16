import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderMain from "../../components/HeaderMain";
import Footer from "../../components/Footer";
import styles from "./Main.module.scss";
import MainLogo from "../../assets/Main_Logo.png";

const Main = () => {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "BIA Technologies.";
  const typingSpeed = 100; // Скорость печати в мс

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);

        // Таймер для скрытия курсора через 5 секунд
        setTimeout(() => {
          setShowCursor(false);
        }, 1000);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className={styles.container}>
      <HeaderMain />
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
          <p>
            Платформа для проверки тестовых заданий
            <br />
            на языке 1С.
          </p>
          <div className={styles.actions}>
            <Link to="/register" className={styles.buttonRegister}>
              Регистрация
            </Link>
            <Link to="/login" className={styles.buttonLogin}>
              Войти
            </Link>
          </div>
        </div>
        <img src={MainLogo} alt="Main User Page Logo" draggable="false" />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
