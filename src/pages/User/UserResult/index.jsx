import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../../../axios';
import DOMPurify from 'dompurify';
import HeaderUser from '../../../components/HeaderUser';
import Footer from '../../../components/Footer';
import styles from './BDResult.module.scss';

const UserResult = () => {
  const [userData, setUserData] = useState(null);
  const [score, setScore] = useState("-");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [highlightedCode, setHighlightedCode] = useState("");

  const { user_id, taskNumber } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user-get-result-info/${user_id}/${taskNumber}`);
        const data = response.data;

        setUserData(data);
        setScore((data.mark == -1) ? ("—") : (data.mark));

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

        setComments(allComments);

        const sanitizedCode = DOMPurify.sanitize(highlightCode(data.codeText), { ADD_ATTR: ['style'] });
        setHighlightedCode(sanitizedCode);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user_id, taskNumber]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      axios.post(`/user-post-new-comment/${user_id}/${taskNumber}`, { commentText: newComment })
        .then(() => {
          setComments([...comments, {
            user: `${userData.surname} ${userData.name}`,
            time: new Date(),
            text: newComment,
            type: 'user'
          }]);
          setNewComment("");
        })
        .catch(error => console.error("Ошибка при отправке комментария:", error));
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axios.post(`/user-post-download-report/${user_id}/${taskNumber}`, {}, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `task_report_${taskNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const highlightCode = (code) => {
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const patterns = {
      '(\\(|\\)|=|;|\\-|&lt;|&gt;|&lt;&gt;|,)': '<span style="color: red;">$1</span>',
      '(\\b[0-9]+\\b)': '<span style="color: black;">$1</span>',
      '(Функция|КонецФункции|Попытка|Исключение|КонецПопытки|Возврат|Если|Тогда|КонецЕсли|Новый|Экспорт|Ложь|Истина|Для|Каждого| Из |Цикл|КонецЦикла| Знач | По |Для|\\?)': '<span style="color: red;">$1</span>',
      '(\\"\\")': '<span style="color: black;">$1</span>',
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
    return code;
  };

  const scoreBackgroundColor = (score === "-" || score === "-1") ? "rgb(196, 196, 196)" : score >= 8 ? "rgb(120, 222, 126)" : score >= 5 ? "rgb(255, 225, 132)" : score >= 0 ? "rgb(226, 51, 51)" : "rgb(196, 196, 196)";

  const groupedComments = comments.reduce((groups, comment) => {
    const date = comment.time.toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(comment);
    return groups;
  }, {});

  return (
    <div className={styles.bdResultPage}>
      <HeaderUser />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <hr />
          <h1>Решение</h1>
          {userData && (
            <div className={styles.taskInfo}>
              <div className={styles.userText}>
                <span>{userData.surname} {userData.name} {userData.patro}</span>
                <p>Выдано: {new Date(userData.createdAt).toLocaleString()}</p>
                <p>Отправлено: {new Date(userData.doneAt).toLocaleString()}</p>
              </div>
              <div className={styles.taskTextBlock}>
                <span><i className="fa-solid fa-bookmark"></i>Задание №{taskNumber}</span><br />
                <span className={styles.taskText}>{userData.taskText}</span><br />
              </div>
            </div>
          )}
          {userData && (
            <div className={styles.autoCheckResults}>
              <div className={styles.resultMain}>
                <p><i className="fa-solid fa-circle-check"></i>Корректность</p>
                <span>{userData.taskPropriety}%</span>
              </div>
              <div className={styles.resultSec}>
                <div className={styles.result}>
                  <p><i className="fa-solid fa-bug"></i>Ошибки</p>
                  <span>{userData.taskErrors}</span>
                </div>
                <div className={styles.result}>
                  <p><i className="fa-solid fa-file-shield"></i>Уязвимости</p>
                  <span>{userData.taskVulnaribilities}</span>
                </div>
                <div className={styles.result}>
                  <p><i className="fa-solid fa-gear"></i>Дефекты</p>
                  <span>{userData.taskDefects}</span>
                </div>
              </div>
            </div>
          )}
          <div className={styles.scoreSection}>
            <div className={styles.scoreSectionText} style={{ backgroundColor: scoreBackgroundColor }}>
              <p>{score}/10</p>
            </div>
          </div>
          <button onClick={handleDownloadReport} className={styles.downloadLink}>Скачать отчет анализа решения</button>
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

export default UserResult;
