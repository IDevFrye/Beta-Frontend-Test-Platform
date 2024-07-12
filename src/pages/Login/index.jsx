import React from "react";
import styles from "./Login.module.scss";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/Header_Logo.png";
import AuthLogo from "../../assets/Auth_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchAuth,
  selectIsAuth,
  selectUserRole,
} from "../../redux/slices/auth";
const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const role = useSelector(selectUserRole);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/" />;
  }
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.parts}>
          <main>
            <Link to="/">
              <img src={logo} alt="BIA logo" />
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Вход</label>
              <input
                placeholder="Email"
                label="E-Mail"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email", { required: "Укажите почту" })}
                type="email"
              />
              <input
                label="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", { required: "Укажите пароль" })}
                fullWidth
                type="password"
                placeholder="Пароль"
              />
              <button disabled={!isValid} type="submit">
                Войти
              </button>
              <Link to="/register">Регистрация</Link>
            </form>
          </main>
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

export default Login;

//add "Неправильно введен логин/пароль"
