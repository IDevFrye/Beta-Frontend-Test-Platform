import React, { useState } from "react";
import HeaderMain from "../../../components/HeaderMain";
import Footer from "../../../components/Footer";
import styles from "./UserProfile.module.scss";
import Avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import FileUpload from "../../../components/FileUpload";
import EditInput from "../../../components/EditInput";

const UserProfile = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(Avatar);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleProfileImageSubmit = (file) => {
    if (file) {
      const newProfileImage = URL.createObjectURL(file);
      setProfileImage(newProfileImage);
      // Call your backend API endpoint to save the new profile image
    }
  };
  return (
    <>
      <div className={styles.container}>
        <HeaderMain isAuth={isAuth} />
        <main>
          <section className={styles.person}>
            <img src={profileImage} alt="Person's Avatar" />
            {/*MUST ADD FETCHED DATA*/}
            <h1>Коба Алексей Юрьевич</h1>
            {/*MUST ADD FETCHED DATA*/}
            <div className={styles.achievements}>
              <div className={styles.rating}>
                {/*MUST ADD FETCHED DATA*/}
                <h2>8,5</h2>
                <p>Средняя оценка</p>
              </div>
              <div className={styles.appointed}>
                {/*MUST ADD FETCHED DATA*/}
                <h2>4</h2>
                <p>Заданий назначено</p>
              </div>
              <div className={styles.testing}>
                {/*MUST ADD FETCHED DATA*/}
                <h2>1</h2>
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
                <>
                  <div className={styles.mark}>
                    <div className={styles.data}>
                      <div className={styles.taskNumber}>
                        {/*MUST ADD FETCHED DATA*/}
                        <h2>Задание 3</h2>
                        <Link to="/usertasks/:taskNumber">Подробнее ></Link> {/*add USERTASK NUMBER FROM BACKEND! */}
                      </div>
                      <div className={styles.result}>
                        {/*MUST ADD FETCHED DATA*/}
                        <h2>7/10</h2>
                        <h3>Оценено</h3>
                        <p>6 minutes ago</p>
                      </div>
                    </div>
                    {/* DIVIDING LINE */}
                    <div className={styles.warnings}>
                      <div className={styles.accuracy}>
                        {/*MUST ADD FETCHED DATA*/}
                        <p>Корректнось</p>
                        <h2>75%</h2>
                      </div>
                      <div className={styles.errors}>
                        {/*MUST ADD FETCHED DATA*/}
                        <p>Ошибки</p>
                        <h2>2</h2>
                      </div>
                      <div className={styles.vulnerabilities}>
                        {/*MUST ADD FETCHED DATA*/}
                        <p>Уязвимости</p>
                        <h2>0</h2>
                      </div>
                      <div className={styles.defects}>
                        {/*MUST ADD FETCHED DATA*/}
                        <p>Дефекты</p>
                        <h2>26</h2>
                      </div>
                    </div>
                  </div>
                  
                </>
              ) : (
                <div className={styles.edit}>
                  <h2>Фото профиля</h2>
                  <FileUpload onSubmit={handleProfileImageSubmit}/>
                  <EditInput />
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;

//add color for each mark ex: 7/10 - yellow, 10/10 - green