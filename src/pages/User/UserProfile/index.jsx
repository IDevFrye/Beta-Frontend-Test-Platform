import React, { useState, useEffect } from "react";
import HeaderUser from "../../../components/HeaderUser";
import axios from "../../../axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import Footer from "../../../components/Footer";
import styles from "./UserProfile.module.scss";
// import Avatar from "../../../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectIsAuth } from "../../../redux/slices/auth";
import FileUpload from "../../../components/FileUpload";
import EditInput from "../../../components/EditInput";

const UserProfile = () => {
  // const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  // if (!isAuth) {
  //   navigate("/login");
  // }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      setUserId(userId);
      fetchUserProfile(userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`/user-get-profile/${userId}`);
      setProfileData(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных профиля:", error);
    }
  };

  const getScoreColor = (score) => {
    if (score === -1 || score === "—") return `${styles.gray} ${styles.score}`;
    if (score >= 0 && score <= 4) return `${styles.red} ${styles.score}`;
    if (score >= 5 && score <= 7) return `${styles.yellow} ${styles.score}`;
    return `${styles.green} ${styles.score}`;
  };

  const formatTimeAgo = (updatedAt) => {
    const duration = moment.duration(moment().diff(moment(updatedAt)));
    if (duration.asMinutes() < 60) return `${Math.floor(duration.asMinutes())} minutes ago`;
    if (duration.asHours() < 24) return `${Math.floor(duration.asHours())} hours ago`;
    return `${Math.floor(duration.asDays())} days ago`;
  };
  // const handleProfileImageSubmit = (file) => {
  //   if (file) {
  //     const newProfileImage = URL.createObjectURL(file);
  //     setProfileImage(newProfileImage);
  //     // Call your backend API endpoint to save the new profile image
  //   }
  // };
    return (
    <>
      <div className={styles.container}>
        <HeaderUser />
        <main>
          {profileData ? (
            <>
              <section className={styles.person}>
                <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${profileData.avatarUrl})` }}
                ></div>
                <h1>{`${profileData.surname} ${profileData.name} ${profileData.patro}`}</h1>
                <div className={styles.achievements}>
                  <div className={styles.rating}>
                    <h2 className={getScoreColor(profileData.averageMark)}>
                      {(profileData.averageMark === -1) ? ("—") : (profileData.averageMark.toFixed(1))}
                    </h2>
                    <p>Средняя оценка</p>
                  </div>
                  <div className={styles.appointed}>
                    <h2>{profileData.totalTasks}</h2>
                    <p>Заданий назначено</p>
                  </div>
                  <div className={styles.testing}>
                    <h2>{profileData.checkingTasksCount}</h2>
                    <p>Заданий на проверке</p>
                  </div>
                </div>
              </section>
              <section className={styles.info}>
                <div className={styles.tabs}>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "profile" ? styles.active : ""
                    }`}
                    onClick={() => handleTabClick("profile")}
                  >
                    Профиль
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "edit" ? styles.active : ""
                    }`}
                    onClick={() => handleTabClick("edit")}
                  >
                    Редактирование
                  </button>
                </div>
                <div className={styles.content}>
                  {activeTab === "profile" ? (
                    profileData.tasks.map((task, index) => (
                      <div key={index} className={styles.mark}>
                        <div className={styles.data}>
                          <div className={styles.taskNumber}>
                            <h2>Задание {task.taskNumber}</h2>
                            <Link
                              to={`${
                                (task.status === "assigned")
                                  ? `/usertask/${userId}/${task.taskNumber}`
                                  : `/userresult/${userId}/${task.taskNumber}`
                              }`}
                            >
                              Подробнее <i className="fa-solid fa-angle-right"></i>
                            </Link>
                          </div>
                          <div className={styles.result}>
                            <h2 className={getScoreColor(task.mark)}>
                              {task.mark === -1 ? "—" : task.mark}/10
                            </h2>
                            <h3>
                              {task.status === "assigned"
                                ? "Не сдано"
                                : task.status === "checking"
                                ? "Не оценено"
                                : "Оценено"}
                            </h3>
                            <p>{formatTimeAgo(task.updatedAt)}</p>
                          </div>
                        </div>
                        <div className={styles.warnings}>
                          <div className={styles.accuracy}>
                            <p>Корректность</p>
                            <h2>{task.status === "assigned" ? "—" : `${task.total}%`}</h2>
                          </div>
                          <div className={styles.errors}>
                            <p>Ошибки</p>
                            <h2>{task.status === "assigned" ? "—" : task.issuesCount}</h2>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.edit}>
                      <h2>Фото профиля</h2>
                      {/* Компонент для загрузки файла */}
                      <FileUpload />
                      <EditInput />
                    </div>
                  )}
                </div>
              </section>
            </>
          ) : (
            <p>Загрузка данных...</p>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};


export default UserProfile;
