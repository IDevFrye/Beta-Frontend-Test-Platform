import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./EditInput.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const EditInput = () => {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    // dispatch(fetchAuthMe());
  }, []);
  // console.log(fetchAuthMe());
  const data = [
    { label: "Фамилия", stateKey: "surname" },
    { label: "Имя", stateKey: "name" },
    { label: "Отчество", stateKey: "patronymic" },
    { label: "E-mail", stateKey: "email" },
    { label: "Пароль", stateKey: "password" },
  ];

  const initialState = {
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович",
    email: "ivan.ivanov@example.com",
    password: "",
  };
  useEffect(() => {
    if (userData) {
      console.log(userData); // Log the userData to see what's inside
      // ...update formData with userData
    }
  }, [userData]);
  const [formData, setFormData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [editedField, setEditedField] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      setUserId(userId);

      // Load user data from backend if available
      const loadUserData = async () => {
        try {
          const response = await fetch(`/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Ошибка загрузки данных пользователя");
          }

          const userData = await response.json();
          setFormData({
            surname: userData.surname || "Иванов",
            name: userData.name || "Иван",
            patronymic: userData.patronymic || "Иванович",
            email: userData.email || "ivan.ivanov@example.com",
            password: "",
          });
        } catch (error) {
          console.error(error);
        }
      };

      loadUserData();
    }

    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
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
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка обновления данных пользователя");
      }

      setIsEditing(false);
      setEditedField(null);
      setSaveMessage("Изменения сохранены");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.slice(0, 3).map(({ label, stateKey }) => (
        <div key={stateKey} className={styles.inputs}>
          <label>{label}</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={formData[stateKey]}
              onChange={(e) => handleInputChange(e, stateKey)}
              disabled={editedField !== stateKey}
              style={{ boxSizing: "border-box" }}
            />
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={styles.editIcon}
              onClick={() => handleEditClick(stateKey)}
            />
          </div>
        </div>
      ))}

      <div className={styles.inputsRow}>
        {data.slice(3, 5).map(({ label, stateKey }) => (
          <div key={stateKey} className={styles.inputs}>
            <label>{label}</label>
            <div className={styles.inputWrapper}>
              <input
                type={stateKey === "email" ? "email" : "password"}
                value={formData[stateKey]}
                onChange={(e) => handleInputChange(e, stateKey)}
                disabled={stateKey === "email" || editedField !== stateKey}
                style={{ boxSizing: "border-box" }}
              />
              {stateKey === "email" ? (
                ""
              ) : (
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={styles.editIcon}
                  onClick={() => handleEditClick(stateKey)}
                />
              )}
            </div>
          </div>
        ))}
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

//add Получать уведомления!
