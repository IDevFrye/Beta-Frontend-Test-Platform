import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderUser from "../../../components/HeaderUser";
import Footer from "../../../components/Footer";
import styles from "./UserHome.module.scss";
import MainLogo from "../../../assets/Main_Logo.png";

const UserHome = () => {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "BIA Technologies.";
  const typingSpeed = 100; 

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
      <HeaderUser />
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
            <Link to="/userprofile" className={styles.buttonProfile}>
              Перейти в личный кабинет
            </Link>
          </div>
        </div>
        <img src={MainLogo} alt="Main User Page Logo" draggable="false" />
      </main>
      <Footer />
    </div>
  );
};

export default UserHome;
