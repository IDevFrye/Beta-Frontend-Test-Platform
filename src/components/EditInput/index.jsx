import React, { useState, useEffect } from "react";
import axios from '../../axios'; // Убедитесь, что этот путь правильный
import { jwtDecode } from "jwt-decode";
import styles from "./EditInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const EditInput = () => {
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    patronymic: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [editedField, setEditedField] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id);

      // Получение данных пользователя
      const loadUserData = async () => {
        try {
          const response = await axios.get(`/user-get-fullname/${decodedToken._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response); // Логгируем ответ от сервера

          const userData = response.data; // Извлекаем данные из ответа
          console.log(userData); // Логгируем JSON-данные

          // Обновление состояния formData
          setFormData({
            surname: userData.surname || "",
            name: userData.name || "",
            patronymic: userData.patro || "",  // учитываем, что патроним может быть "patro"
            email: userData.email || "",
            password: "",
          });
        } catch (error) {
          console.error("Ошибка при загрузке данных пользователя:", error);
        }
      };

      loadUserData();
    }
  }, []);

  const handleInputChange = (e, stateKey) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, [stateKey]: value }));
  };

  const handleEditClick = (stateKey) => {
    setIsEditing(true);
    setEditedField(stateKey);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(`/user-patch-profile-data/${userId}`, {
        surname: formData.surname,
        name: formData.name,
        patro: formData.patronymic,
        password: formData.password || undefined,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsEditing(false);
        setEditedField(null);
        setSaveMessage("Изменения сохранены");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        throw new Error("Ошибка обновления данных пользователя");
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["surname", "name", "patronymic"].map((stateKey) => (
        <div key={stateKey} className={styles.inputs}>
          <label>{stateKey === 'surname' ? "Фамилия" : stateKey === 'name' ? "Имя" : "Отчество"}</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={formData[stateKey]}
              onChange={(e) => handleInputChange(e, stateKey)}
              disabled={editedField !== stateKey && editedField !== null} // Поле редактируется только если на него кликнули
              className={editedField === stateKey ? styles.active : ''} // Добавляем класс для активного состояния
              placeholder={stateKey === 'surname' ? "Введите фамилию" :
                          stateKey === 'name' ? "Введите имя" :
                          "Введите отчество"}
            />
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={`${styles.editIcon} ${editedField === stateKey ? styles.activeIcon : ''}`}
              onClick={() => handleEditClick(stateKey)}
            />
          </div>
        </div>
      ))}

      <div className={styles.inputsRow}>
        <div className={styles.inputs}>
          <label>Email</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              value={formData.email}
              disabled
              placeholder="Введите ваш email"
            />
          </div>
        </div>

        <div className={styles.inputs}>
          <label>Пароль</label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
              disabled={editedField !== "password" && editedField !== null}
              className={editedField === "password" ? styles.active : ''}
              placeholder="Введите новый пароль"
            />
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={`${styles.editIcon} ${editedField === "password" ? styles.activeIcon : ''}`}
              onClick={() => handleEditClick("password")}
            />
          </div>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <button type="submit" className={styles.btn}>
          Сохранить
        </button>
        {saveMessage && <p className={styles.saveMessage}>{saveMessage}</p>}
      </div>
    </form>
  );
};

export default EditInput;
