import React, { useState } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin';
import Footer from '../../../components/Footer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './BDResult.module.scss';

const BDResult = () => {
  const [score, setScore] = useState("-");
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Admin", time: "17:47", text: "Очень понравилось Ваша работа, замечаний не имею. Оценка - 10/10" },
    { id: 2, user: "Сергей", time: "18:12", text: "Спасибо за предоставленную возможность и обратную связь!" }
  ]);

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handleSaveScore = () => {
    setIsEditing(false);
  };

  const handleAddComment = () => {
    const newCommentObj = { 
      id: comments.length + 1, 
      user: "Сергей", 
      time: new Date().toLocaleTimeString().slice(0, 5), 
      text: newComment 
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const scoreBackgroundColor = score === "-" ? "gray" : score >= 8 ? "green" : score >= 5 ? "yellow" : score >= 0 ? "red" : "gray";

  return (
    <div className={styles.bdResultPage}>
      <HeaderAdmin />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <hr></hr>
          <h1>Решение</h1>
          <div className={styles.taskInfo}>
            <span>Задание №100</span><br></br>
            <span>Сергеев Антон Игоревич</span>
            <p>Выдано: 19.05.2024/14:00</p>
            <p>Отправлено: 22.05.2024/12:10</p>
          </div>
          <div className={styles.autoCheckResults}>
            <div className={styles.result}>
              <p>Корректность</p>
              <p>100%</p>
            </div>
            <div className={styles.result}>
              <p>Ошибки</p>
              <p>0</p>
            </div>
            <div className={styles.result}>
              <p>Уязвимости</p>
              <p>0</p>
            </div>
            <div className={styles.result}>
              <p>Дефекты</p>
              <p>14</p>
            </div>
          </div>
          <div className={styles.scoreSection} style={{ backgroundColor: scoreBackgroundColor }}>
            {isEditing ? (
              <input type="text" value={score} onChange={handleScoreChange} />
            ) : (
              <p>{score}/10</p>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Сохранить" : "Изменить оценку"}
            </button>
          </div>
          <a href="/download/report" className={styles.downloadLink}>Скачать отчет анализа решения</a>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.codeDisplay}>
            <SyntaxHighlighter language="1c" style={oneLight}>
              {`Функция ТаблицаЗначенийВМассив (ТаблицаЗначений) Экспорт
Результат = Новый Массив();
СтруктураСтроки = "";
НужнаЗапятая = Ложь;

Для Каждого Колонка Из ТаблицаЗначений.Колонки Цикл
    Если НужнаЗапятая Тогда
        СтруктураСтроки = СтруктураСтроки + ",";
    КонецЕсли;
    
    СтруктураСтроки = СтруктураСтроки + Колонка.Имя;
    НужнаЗапятая = Истина;
КонецЦикла;

Для Каждого Строка Из ТаблицаЗначений Цикл
    НоваяСтрока = Новый Структура(СтруктураСтроки);
    ЗаполнитьЗначенияСвойств(НоваяСтрока, Строка);
    Результат.Добавить(НоваяСтрока);
КонецЦикла;
КонецФункции;`}
            </SyntaxHighlighter>
          </div>
          <div className={styles.commentsSection}>
            <div className={styles.commentInput}>
              <input 
                type="text" 
                placeholder="Оставить комментарий..." 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} 
              />
              <button onClick={handleAddComment}><i class="fa-solid fa-paper-plane"></i></button>
            </div>
            <div className={styles.comments}>
              {comments.map(comment => (
                <div className={`${styles.comment} ${comment.user === "Admin" ? styles.admin : styles.user}`} key={comment.id}>
                  <p className={styles.commentAuthor}>{comment.user === "Admin" ? "Admin" : comment.user}</p>
                  <p className={styles.commentTime}>{comment.time}</p>
                  <p className={styles.commentText}>{comment.text}</p>
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

export default BDResult;
