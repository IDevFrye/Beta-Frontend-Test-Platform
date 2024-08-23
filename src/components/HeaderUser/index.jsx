import React, { useEffect, useState } from "react";
import logo from "../../assets/Header_Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderUser.module.scss";
import { logout } from "../../redux/slices/auth";
import { jwtDecode } from "jwt-decode";
import axios from "../../axios";

const HeaderUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", surname: "", patro: "" });
  const [emailLink, setEmailLink] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      console.log(userId);
      setUserId(userId);

      // Запрос на сервер для получения информации о пользователе
      axios.get(`/user-get-fullname/${userId}`)
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, []);

  useEffect(() => {
  if (userInfo.name && userInfo.surname && userInfo.patro) {
      const date = new Date().toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const subject = `[ОЭ ${date}][${userId}] Запрос поддержки от ${userInfo.surname} ${userInfo.name} ${userInfo.patro}`;
      const body = `Добрый день!\n\nОписание проблемы: (опишите, что случилось)\nПриоритет: от 1 до 4 (1 - срочный, 4 - некритичный)\nЖелаемая дата окончания сопровождения: (проставьте желаемую дату разрешения вопроса)\n\n___\nС уважением,\nпользователь платформы проверки тестовых заданий\n${userInfo.surname} ${userInfo.name} ${userInfo.patro}`;

      const mailtoLink = `mailto:vcp-tech-sup@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setEmailLink(mailtoLink);
    }
  }, [userInfo, userId]);

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <img src={logo} alt="BIA Logo" draggable="false"/>
      <nav>
        <ul>
          <li className={isActive("/userhome") ? styles.active : ""}>
            <Link to="/userhome">Главная</Link>
          </li>
          <li className={isActive("/userprofile") || isActive("/usertask") || isActive("/userresult") ? styles.active : ""}>
            <Link to="/userprofile">Профиль</Link>
          </li>
          <li>
            <a href={emailLink}>Поддержка</a>
          </li>
        </ul>
      </nav>
      <button onClick={onClickLogout} className={styles.button}>
        ВЫЙТИ
      </button>
    </header>
  );
};

export default HeaderUser;
