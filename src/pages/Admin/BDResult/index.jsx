import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import axios from '../../../axios';
import DOMPurify from 'dompurify';
import HeaderAdmin from '../../../components/HeaderAdmin';
import Footer from '../../../components/Footer';
import styles from './BDResult.module.scss';

const BDResult = () => {
  const { taskNumber } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const surname = searchParams.get('surname');
  const patro = searchParams.get('patro');
  const [data, setData] = useState(null);
  const [score, setScore] = useState("-");
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    if (name && surname && patro && taskNumber) {
      axios.get(`/admin-get-solution/${taskNumber}`, {
        params: { name, surname, patro }
      })
      .then(response => {
        setData(response.data);
        setScore(response.data.mark !== -1 ? response.data.mark : "-");

        const adminComments = response.data.commentAdmin.map((comment, index) => ({
          id: `admin-${index + 1}`,
          user: "Admin",
          role: "admin",
          time: new Date(comment.timestamp), // Сохраняем объект Date
          text: comment.message
        }));

        const userComments = response.data.commentUser.map((comment, index) => ({
          id: `user-${index + 1}`,
          user: `${response.data.name} ${response.data.surname} ${response.data.patro}`,
          role: "user",
          time: new Date(comment.timestamp), // Сохраняем объект Date
          text: comment.message
        }));

        const combinedComments = [...adminComments, ...userComments].sort(
          (a, b) => a.time - b.time
        );

        setComments(combinedComments);
        highlightCode(response.data.codeText);
      })
      .catch(error => {
        console.error("Ошибка при получении данных:", error);
      });
    }
  }, [name, surname, patro, taskNumber]);

  const highlightCode = (code) => {
    if (!code) return;
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const patterns = {
      '(\\(|\\)|=|;|\\-|&lt;|&gt;|&lt;&gt;|,|\\+|\\*|\\.)': '<span style="color: red;">$1</span>',
      '(\\b[0-9]+\\b)': '<span style="color: black;">$1</span>',
      '( И |Пока|Иначе|Функция|КонецФункции|Попытка|Исключение|КонецПопытки|Возврат|Если|Тогда|КонецЕсли|Новый|Экспорт|Ложь|Истина|Для|Каждого| Из |Цикл|КонецЦикла| Знач | По |Процедура|КонецПроцедуры|Для|\\?)': '<span style="color: red;">$1</span>',
      '(\\"\\")': '<span style="color: black;">$1</span>',
      '(&НаКлиенте|&НаСервере)':'<span style="color: darkred;">$1</span>',
    };

    for (const pattern in patterns) {
      const regex = new RegExp(pattern, 'g');
      code = code.replace(regex, patterns[pattern]);
    }

    code = code.replace(/(<span style="[^>]*>[^<]*<\/span>|[^<]+)/g, (match) => {
      if (match.startsWith('<span')) {
        return match;
      } else {
        return `<span style="color: blue;">${match}</span>`;
      }
    });

    code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const highlighted = DOMPurify.sanitize(code, { ADD_ATTR: ['style'] });
    setHighlightedCode(highlighted);
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const scoreBackgroundColor = score === "-" ? "rgb(196, 196, 196)" : score >= 8 ? "rgb(120, 222, 126)" : score >= 5 ? "rgb(255, 225, 132)" : score >= 0 ? "rgb(226, 51, 51)" : "rgb(196, 196, 196)";

  const handleSaveScore = () => {
    setIsEditing(false);
    axios.patch(`/admin-patch-mark-edit/${taskNumber}`, {
      name, surname, patro, mark: score
    })
    .then(response => {
      console.log("Оценка успешно сохранена", response.data);
    })
    .catch(error => {
      console.error("Ошибка при сохранении оценки:", error);
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: `admin-${comments.length + 1}`,
      user: "Admin",
      role: "admin",
      time: new Date(), // Сохраняем объект Date
      text: newComment
    };

    const updatedComments = [...comments, comment].sort((a, b) => a.time - b.time);
    setComments(updatedComments);
    setNewComment("");

    axios.post(`/admin-post-new-comment/${taskNumber}`, {
      name, surname, patro, commentText: newComment
    })
    .then(response => {
      console.log("Комментарий успешно добавлен", response.data);
    })
    .catch(error => {
      console.error("Ошибка при добавлении комментария:", error);
    });
  };

  const downloadReport = () => {
    axios.post(`/admin-post-download-report/${taskNumber}`, {
      name, surname, patro
    }, {
      responseType: 'blob'
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Отчет анализа решения ${taskNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => {
      console.error("Ошибка при скачивании отчета:", error);
    });
  };

  // Группировка комментариев по дате
  const groupedComments = comments.reduce((groups, comment) => {
    const date = comment.time.toLocaleDateString(); // Группируем по дате
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(comment);
    return groups;
  }, {});

  const getPropColor = (prop) => {
    if (prop === -1 || prop === "—") return `${styles.gray}`;
    if (prop >= 0 && prop <= 40) return `${styles.red}`;
    if (prop >= 41 && prop <= 75) return `${styles.yellow}`;
    return `${styles.green}`;
  };

  return (
    <div className={styles.bdResultPage}>
      <HeaderAdmin />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h1>Решение</h1>
          {data ? (
            <>
              <div className={styles.taskInfo}>
                <div className={styles.userText}>
                  <span>{`${data.name} ${data.surname} ${data.patro}`}</span>
                  <p>Выдано: {new Date(data.createdAt).toLocaleString()}</p>
                  <p>Отправлено: {new Date(data.doneAt).toLocaleString()}</p>
                </div>
                <div className={styles.taskTextBlock}>
                  <span><i className="fa-solid fa-bookmark"></i>Задание №{taskNumber}</span><br />
                  <span className={styles.taskText}>{data.taskText}</span>
                </div>
              </div>
              <div className={styles.autoCheckResults}>
                <div className={styles.resultMain}>
                  <p><i className="fa-solid fa-circle-check"></i>Корректность</p>
                  <span className={getPropColor(data.taskPropriety)}>{`${(data.taskPropriety == "NaN") ? (100) : (data.taskPropriety)}%`}</span>
                </div>
                <div className={styles.resultSec}>
                  <div className={styles.result}>
                    <p><i className="fa-solid fa-bug"></i>Ошибки</p>
                    <span>{data.taskErrors}</span>
                  </div>
                  <div className={styles.result}>
                    <p><i className="fa-solid fa-file-shield"></i>Уязвимости</p>
                    <span>{data.taskVulnaribilities}</span>
                  </div>
                  <div className={styles.result}>
                    <p><i className="fa-solid fa-gear"></i>Дефекты</p>
                    <span>{data.taskDefects}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Загрузка данных...</p>
          )}
          <div className={styles.scoreSection}>
            <div className={styles.scoreSectionText} style={{ backgroundColor: scoreBackgroundColor }}>
              {isEditing ? (
                <div className={styles.editingScore}>
                  <input type="number" value={score} onChange={handleScoreChange} min="0" max="10"/>
                  <span>/10</span>
                </div>
              ) : (
                <p>{score}/10</p>
              )}
            </div>
            <div className={styles.scoreSectionButton}>
              {isEditing ? (
                <div className={styles.editingScoreButton}>
                  <button onClick={handleSaveScore}>
                    Сохранить
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(!isEditing)}>
                  Изменить оценку
                </button>
              )}
            </div>
          </div>
          <button onClick={downloadReport} className={styles.downloadLink}>Скачать отчет анализа решения</button>
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
              {Object.keys(groupedComments).map(date => (
                <div key={date}>
                  <div className={styles.separator}>
                    <hr className={styles.dateSeparator} />
                    <div className={styles.dateLabel}>{date}</div>
                  </div>
                  {groupedComments[date].map(comment => (
                    <div 
                      className={`${styles.comment} ${comment.role === "admin" ? styles.admin : styles.user}`} 
                      key={comment.id}
                    >
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

export default BDResult;
