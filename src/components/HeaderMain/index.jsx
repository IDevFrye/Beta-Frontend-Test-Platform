import React, { useEffect, useState } from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderMain.module.scss";
import { logout, selectIsAuth } from "../../redux/slices/auth";
const HeaderMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [emailLink, setEmailLink] = useState("");

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  useEffect(() => {
    const date = new Date().toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const subject = `[ОЭ ${date}][main] Запрос поддержки`;
      const body = `Добрый день!\n\nОписание проблемы: (опишите, что случилось)\nПриоритет: от 1 до 4 (1 - срочный, 4 - некритичный)\nЖелаемая дата окончания сопровождения: (проставьте желаемую дату разрешения вопроса)\n\n___\nС уважением,\nпользователь платформы проверки тестовых заданий`;

      const mailtoLink = `mailto:VCP@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setEmailLink(mailtoLink);
  }, []);
  
  return (
    <header>
      <img src={logo} alt="BIA Logo" />
      <nav>
        <ul>
          <li className={styles.cur}>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <a target="_blank" href="https://bia-tech.ru/?utm_referrer=https%3A%2F%2Fwww.google.com%2F">Наш сайт</a>
          </li>
          <li>
            <a href={emailLink}>Поддержка</a>
          </li>
        </ul>
      </nav>
      <Link to="/login" className={styles.button}>
        ВОЙТИ
      </Link>
    </header>
  );
};

export default HeaderMain;

//add active clicks on LINKS
