import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import HeaderUser from '../../../components/HeaderUser';
import { Link} from "react-router-dom";
import Footer from '../../../components/Footer';
import styles from './BDResult.module.scss';

const UserTask = () => {
  const [score, setScore] = useState("-");
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Admin", time: "17:47", text: "Очень понравилось Ваша работа, замечаний не имею. Оценка - 10/10" },
    { id: 2, user: "Сергей", time: "18:12", text: "Спасибо за предоставленную возможность и обратную связь!" }
  ]);
  const [highlightedCode, setHighlightedCode] = useState("");

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

  const highlightCode = (code) => {
  // Замена знаков < и > на их HTML-эквиваленты
  code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const patterns = {
    // Подсветка строк
    
    // Подсветка скобок, знаков равно, точки с запятой, минуса, и символов <>
    '(\\(|\\)|=|;|\\-|&lt;|&gt;|&lt;&gt;|,)': '<span style="color: red;">$1</span>',
    // Подсветка цифр
    '(\\b[0-9]+\\b)': '<span style="color: black;">$1</span>',
    // Подсветка ключевых слов
    '(Функция|КонецФункции|Попытка|Исключение|КонецПопытки|Возврат|Если|Тогда|КонецЕсли|Новый|Экспорт|Ложь|Истина|Для|Каждого| Из |Цикл|КонецЦикла| Знач | По |Для|\\?)': '<span style="color: red;">$1</span>',
    '(\\"\\")': '<span style="color: black;">$1</span>',
    
  };

  for (const pattern in patterns) {
    const regex = new RegExp(pattern, 'g');
    code = code.replace(regex, patterns[pattern]);
  }

  // Найти оставшийся текст и обернуть его в синий цвет
  code = code.replace(/(<span style="[^>]*>[^<]*<\/span>|[^<]+)/g, (match) => {
    if (match.startsWith('<span')) {
      return match; // Сохраняем уже подсвеченные части
    } else {
      return `<span style="color: blue;">${match}</span>`; // Подсвечиваем оставшийся текст
    }
  });

  // Возвращаем знаки < и > обратно
  code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  return code;
};

  const scoreBackgroundColor = score === "-" ? "rgb(196, 196, 196)" : score >= 8 ? "rgb(120, 222, 126)" : score >= 5 ? "rgb(255, 225, 132)" : score >= 0 ? "rgb(226, 51, 51)" : "rgb(196, 196, 196)";

  const code = `Функция ТаблицаЗначенийВМассив(ТаблицаЗначений) Экспорт
	
	Результат = Новый Массив();
	СтруктураСтрокой = "";
	НужнаЗапятая = Ложь;
	
	Для Каждого Колонка Из ТаблицаЗначений.Колонки Цикл
		
		Если НужнаЗапятая Тогда
			СтруктураСтрокой = СтруктураСтрокой + ",";
		КонецЕсли;
		
		СтруктураСтрокой = СтруктураСтрокой + Колонка.Имя;
		НужнаЗапятая = Истина;
		
	КонецЦикла;
	
	Для Каждого Строка Из ТаблицаЗначений Цикл
		НоваяСтрока = Новый Структура(СтруктураСтрокой);
		ЗаполнитьЗначенияСвойств(НоваяСтрока, Строка);
		Результат.Добавить(НоваяСтрока);
		
	КонецЦикла;
	
	Возврат Результат;

КонецФункции`;

  useEffect(() => {
    const sanitizedCode = DOMPurify.sanitize(highlightCode(code), { ADD_ATTR: ['style'] });
    setHighlightedCode(sanitizedCode);
  }, []);

  return (
    <div className={styles.bdResultPage}>
      <HeaderUser />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <hr></hr>
          <h1>Решение</h1>
          <div className={styles.taskInfo}>
            <span>Задание №100</span><br></br>
            <span>Сергеев Антон Игоревич</span>
            <p>Выдано: 19.05.2024/14:00</p>
            <p>Отправлено: —</p>
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
                <p><i className="fa-solid fa-shield-halved"></i>Уязвимости</p>
                <span>—</span>
              </div>
              <div className={styles.result}>
                <p><i className="fa-solid fa-gear"></i>Дефекты</p>
                <span>—</span>
              </div>
            </div>
          </div>
          <div className={styles.scoreSection} >
            <div className={styles.scoreSectionText} style={{ backgroundColor: scoreBackgroundColor }}>
                <p>{score}/10</p>
            </div>
          </div>
          <Link to="/userhome" className={styles.sendSolution}>
              Отправить решение
          </Link>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.codeDisplay}>
            <pre><code dangerouslySetInnerHTML={{ __html: highlightedCode }}></code></pre>
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
              {comments.map(comment => (
                <div className={`${styles.comment} ${comment.user === "Admin" ? styles.admin : styles.user}`} key={comment.id}>
                  <p className={styles.commentAuthor}>{comment.user === "Admin" ? "Admin" : comment.user}</p>
                  <p className={styles.commentText}>{comment.text}</p>
                  <p className={styles.commentTime}>{comment.time}</p>
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
