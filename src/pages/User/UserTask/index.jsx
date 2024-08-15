import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import HeaderUser from '../../../components/HeaderUser';
import { useParams, useNavigate } from "react-router-dom";
import Footer from '../../../components/Footer';
import styles from './BDResult.module.scss';
import BSLConsole from '../../../components/BSLConsole';
import axios from "../../../axios";

const UserTask = () => {
  const [taskInfo, setTaskInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(0);
  const { user_id, taskNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем информацию о задаче и комментарии
    axios.get(`/user-get-task-info/${user_id}/${taskNumber}`)
      .then(response => {
        console.log('Данные о задаче:', response.data);
        setTaskInfo(response.data);
        // Объединяем и сортируем комментарии по времени
        const allComments = [
          ...response.data.commentUser.map(comment => ({
            user: `${response.data.surname} ${response.data.name}`,
            time: new Date(comment.timestamp),
            text: comment.message,
            type: 'user'
          })),
          ...response.data.commentAdmin.map(comment => ({
            user: "Admin",
            time: new Date(comment.timestamp),
            text: comment.message,
            type: 'admin'
          }))
        ].sort((a, b) => a.time - b.time);
        console.log('Комментарии:', allComments);
        setComments(allComments);
      })
      .catch(error => console.error('Ошибка при получении информации о задаче:', error));

    // Проверяем статус задачи (выполнена/не выполнена)
    axios.get(`/user-task-getDone/${user_id}/${taskNumber}`)
      .then(response => {
        console.log('Статус выполнения задачи:', response.data);
        setIsSubmitted(response.data);
      })
      .catch(error => console.error('Ошибка при проверке статуса задачи:', error));
  }, [taskNumber, user_id]);

  const groupedComments = comments.reduce((groups, comment) => {
    const date = comment.time.toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(comment);
    return groups;
  }, {});

  const handleAddComment = () => {
    if (newComment.trim()) {
      axios.post(`/user-post-new-comment/${user_id}/${taskNumber}`, { commentText: newComment })
        .then(() => {
          setComments([...comments, {
            user: `${taskInfo.surname} ${taskInfo.name}`,
            time: new Date(),
            text: newComment,
            type: 'user'
          }]);
          setNewComment("");
        })
        .catch(error => console.error("Ошибка при отправке комментария:", error));
    }
  };

  const handleFinish = () => {
    navigate("/userprofile");
  };

  if (!taskInfo) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.bdResultPage}>
      <HeaderUser />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <hr />
          <h1>Решение</h1>
          <div className={styles.taskInfo}>
            <div className={styles.userText}>
              <span>{`${taskInfo.surname} ${taskInfo.name} ${taskInfo.patronymic}`}</span>
              <p>Выдано: {new Date(taskInfo.createdAt).toLocaleString()}</p>
              <p>Отправлено: —</p>
            </div>
            <div className={styles.taskTextBlock}>
              <span><i className="fa-solid fa-bookmark"></i>Задание №{taskNumber}</span><br />
              <span className={styles.taskText}>{taskInfo.taskText}</span><br />
            </div>
          </div>
          <div className={styles.autoCheckResults}>
            <div className={styles.resultMain}>
              <p><i className="fa-solid fa-circle-check"></i>Корректность</p>
              <span>—</span>
            </div>
            <div className={styles.resultSec}>
              <div className={styles.result}>
                <p><i className="fa-solid fa-bug"></i>Ошибки</p>
                <span>—</span>
              </div>
              <div className={styles.result}>
                <p><i className="fa-solid fa-file-shield"></i>Уязвимости</p>
                <span>—</span>
              </div>
              <div className={styles.result}>
                <p><i className="fa-solid fa-gear"></i>Дефекты</p>
                <span>—</span>
              </div>
            </div>
          </div>
          <div className={styles.scoreSection}>
            <div className={styles.scoreSectionText}>
                <p>—/10</p>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.codeDisplayM}>
          {isSubmitted === 0 ? (
              <BSLConsole userId={user_id} taskNumber={taskNumber} />
          ) : (
            <div className={styles.codeComplete}>
              <p>Решение успешно отправлено!</p>
              <button onClick={handleFinish}>Завершить</button>
            </div>
            )
          }
          </div>
          <div className={styles.commentsSection}>
            <div className={styles.commentInput}>
              <input 
                type="text" 
                placeholder="Оставить комментарий..." 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} 
              />
              <button onClick={handleAddComment}><i className="fa-solid fa-paper-plane"></i></button>
            </div>
            <div className={styles.comments}>
              {Object.keys(groupedComments).map(date => (
                <div key={date}>
                  <div className={styles.separator}>
                    <hr className={styles.dateSeparator} />
                    <div className={styles.dateLabel}>{date}</div>
                  </div>
                  {groupedComments[date].map((comment, index) => (
                    <div className={`${styles.comment} ${comment.user === "Admin" ? styles.admin : styles.user}`} key={index}>
                      <p className={styles.commentAuthor}>{comment.user}</p>
                      <p className={styles.commentText}>{comment.text}</p>
                      <p className={styles.commentTime}>{comment.time.toLocaleTimeString().slice(0, 5)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserTask;
