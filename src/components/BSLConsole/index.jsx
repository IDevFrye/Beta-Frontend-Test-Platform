import React, { useState, useRef, useEffect } from "react";
import styles from "./BSLConsole.module.scss";
import axios from '../../axios';

const BSLConsole = ({ userId, taskNumber }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    // const fetchCodeText = async () => {
    //   try {
    //     const response = await axios.get(`/user-task/${userId}/${taskNumber}`);
    //     const codeText = response.data.codeText;
    //     console.log(codeText);
    //     const iframeWindow = iframeRef.current.contentWindow;
    //     iframeWindow.postMessage({ type: 'setCode', codeText }, 'http://localhost:4000/');
    //   } catch (error) {
    //     console.error("Ошибка при загрузке кода:", error);
    //   }
    // };

    // fetchCodeText();

    const handleMessage = (event) => {
      const { type, text } = event.data;
      if (type === 'submit') {
        axios.patch(`/user-patch-task-load/${userId}/${taskNumber}`, { code: text })
          .then(response => {
            console.log("Решение успешно отправлено:", response.data);
            localStorage.setItem('response', response.data);
            setIsSubmitted(response.data);
          })
          .catch(error => {
            console.error("Ошибка при отправке решения:", error);
          });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [userId, taskNumber]);

  const handleClickSubmit = () => {
    const iframeWindow = iframeRef.current.contentWindow;
    iframeWindow.postMessage({ type: 'getText', action: 'submit' }, 'http://localhost:4000/');
  };

  return (
    <form className={styles.console}>
      <div className={styles.textAreaContainer}>
        <div>
          <iframe
            ref={iframeRef}
            src="http://localhost:4000/"
            title="Eternal Content"
            width="750px"
            height="470px"
            sandbox="allow-scripts allow-same-origin"
            allow="clipboard-read; clipboard-write; encrypted-media"
          ></iframe>
          <div className={styles.actions}>
            <button className={styles.sendSolution} onClick={handleClickSubmit}>Отправить решение</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BSLConsole;
