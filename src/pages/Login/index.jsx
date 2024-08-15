import React from "react";
import styles from "./Login.module.scss";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/Header_Logo.png";
import AuthLogo from "../../assets/Auth_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth, selectUserRole } from "../../redux/slices/auth";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const role = useSelector(selectUserRole);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchAuth(values));
      if (!data.payload) {
        alert("Не удалось авторизоваться");
        return;
      }

      if ('token' in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
        window.localStorage.setItem("role", data.payload.role); // Сохранение роли пользователя
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Если сервер вернул ошибку валидации
        alert(error.response.data.message);
      } else {
        // Другие ошибки
        alert("Произошла ошибка: " + error.message);
      }
    }
  };

  if (isAuth) {
    return role === "admin" ? <Navigate to="/adminhome" /> : <Navigate to="/userhome" />;
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.parts}>
          <main>
            <Link to="/">
              <img src={logo} alt="BIA logo" draggable="false"/>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Вход</label>
              <input
                placeholder="Email"
                {...register("email", { required: "Укажите почту" })}
                type="email"
              />
              <input
                placeholder="Пароль"
                {...register("password", { required: "Укажите пароль" })}
                type="password"
              />
              <button disabled={!isValid} type="submit">
                Войти
              </button>
              <Link to="/register" className={styles.reg}>Регистрация</Link>
            </form>
          </main>
          <div className={styles.footauth}>
            <a href="https://bia-tech.ru/wp-content/uploads/2024/06/Согласие_на_обработку_персональных_данных.pdf" target="_blank" className={styles.policy}>Политика конфиденциальности</a>
            <span className={styles.copy}>Copyright 2024</span>
          </div>
        </div>
      </div>
      <div className={styles.intro}>
        <img src={AuthLogo} alt="Authorization Logo" draggable="false"/>
        <h1>BIA Technologies</h1>
        <p>Платформа проверки тестовых заданий на языке 1С</p>
      </div>
    </div>
  );
};

export default Login;
