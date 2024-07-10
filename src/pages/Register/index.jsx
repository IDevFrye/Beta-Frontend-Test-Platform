import React from "react";
import styles from "./Register.module.scss";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/Header_Logo.png";
import AuthLogo from "../../assets/Auth_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchRegister,
  selectIsAuth,
  selectUserRole,
} from "../../redux/slices/auth";
const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const role = useSelector(selectUserRole);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
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
      return alert("Не удалось зарегистрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/" />;
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
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register("surname", { required: "Укажите фамилию" })}
                placeholder="Фамилия"
              />
              <input
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register("name", { required: "Укажите имя" })}
                placeholder="Имя"
              />
              <input
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register("patronymic", { required: "Укажите отчество" })}
                placeholder="Отчество"
              />
              <input
                placeholder="Почта"
                label="E-Mail"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email", { required: "Укажите почту" })}
                type="Email"
              />
              <input
                className={styles.field}
                label="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", { required: "Укажите пароль" })}
                fullWidth
                type="password"
                placeholder="Пароль"
              />
              <button disabled={!isValid} type="submit">
              Подтвердить
              </button>
              <Link to="/login">Войти</Link>
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

export default Register;

//add "Пользователь с такой почтой уже существует"
