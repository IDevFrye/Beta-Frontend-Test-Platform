// Register/index.jsx
import React from "react";
import styles from "./Register.module.scss";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/Header_Logo.png";
import AuthLogo from "../../assets/Auth_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth, selectUserRole } from "../../redux/slices/auth";

const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const role = useSelector(selectUserRole);

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      surname: "",
      name: "",
      patronymic: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      alert("Не удалось зарегистрироваться");
      return;
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return role === "admin" ? <Navigate to="/adminhome" /> : <Navigate to="/userhome" />;
  }

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <div className={styles.parts}>
          <main>
            <Link to="/">
              <img src={logo} alt="BIA logo" />
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Регистрация</label>
              <input
                {...register("surname", { required: "Укажите фамилию" })}
                placeholder="Фамилия"
              />
              <input
                {...register("name", { required: "Укажите имя" })}
                placeholder="Имя"
              />
              <input
                {...register("patronymic", { required: "Укажите отчество" })}
                placeholder="Отчество"
              />
              <input
                {...register("email", { required: "Укажите почту" })}
                type="email"
                placeholder="Почта"
              />
              <input
                {...register("password", { required: "Укажите пароль" })}
                type="password"
                placeholder="Пароль"
              />
              <button disabled={!isValid} type="submit">
                Подтвердить
              </button>
              <Link to="/login">Войти</Link>
            </form>
          </main>
          <div className={styles.footauth}>
            <a href="#" className={styles.policy}>Политика конфиденциальности</a>
            <span className={styles.copy}>Copyright 2024</span>
          </div>
        </div>
      </div>
      <div className={styles.intro}>
        <img src={AuthLogo} alt="Authorization Logo" />
        <h1>BIA Technologies</h1>
        <p>Платформа проверки тестовых заданий на языке 1С</p>
      </div>
    </div>
  );
};

export default Register;
