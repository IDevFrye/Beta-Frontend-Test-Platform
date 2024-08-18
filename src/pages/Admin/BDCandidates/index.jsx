import React, { useState, useEffect } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import styles from "./BDCandidates.module.scss";
import axios from "../../../axios";

const BDCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);

  useEffect(() => {
    axios.get("/admin-get-candidates")
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error("Не удалось получить список кандидатов:", error);
      });
  }, []);

  const openModal = (candidate) => {
    setCurrentCandidate(candidate);
    setModalOpen(true);

    axios.get("/admin-get-not-assigned-tasks", {
      params: {
        name: candidate.name,
        surname: candidate.surname,
        patro: candidate.patro
      }
    })
    .then(response => {
      console.log("Задачи:", response.data);
      setTasks(response.data);
    })
    .catch(error => {
      console.error("Не удалось получить задания:", error);
    });
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter((id) => id !== taskId)
        : [...prevSelectedTasks, taskId]
    );
  };

  const saveAssignments = () => {
    if (currentCandidate) {
      const payload = {
        name: currentCandidate.name,
        surname: currentCandidate.surname,
        patro: currentCandidate.patro,
        choosedTaskNumbers: selectedTasks
      };

      axios.post("/admin-post-candidates-assign/", payload)
        .then(response => {
          console.log("Задания успешно назначены:", response.data);
          setModalOpen(false);
          setSelectedTasks([]);
        })
        .catch(error => {
          console.error("Не удалось назначить задания:", error);
        });
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.taskText.toLowerCase().includes(filterText.toLowerCase())
  );

  const getAverageMarkClass = (mark) => {
    if (mark === "N/A") return styles.gray;
    const average = parseFloat(mark);
    if (average >= 8) return styles.green;
    if (average >= 4) return styles.yellow;
    if (average >= 0) return styles.red;
    return styles.gray;
  };

  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <main className={styles.mainContent}>
        <hr className={styles.mainHR}></hr>
        <h1>Кандидаты</h1>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.first}>ФИО</span>
            <span>Задания</span>
            <span>Средняя оценка</span>
            <span>Назначить</span>
          </div>
          <div className={styles.tableBody}>
            {candidates.map((candidate) => (
              <div key={candidate.name + candidate.surname + candidate.patro} className={styles.tableRow}>
                <span className={styles.first}>
                  <div
                    className={styles.ava}
                    style={{ backgroundImage: `url(${candidate.avatarUrl})` }}
                  ></div>
                  <span className={styles.name}>{`${candidate.surname} ${candidate.name} ${candidate.patro}`}</span>
                </span>
                <span className={styles.count}>{candidate.taskCount}</span>
                <span className={`${styles.score} ${getAverageMarkClass(candidate.averageMark)}`}>
                  {candidate.averageMark === "N/A" ? "—" : candidate.averageMark}
                </span>
                <span className={styles.assignButton} onClick={() => openModal(candidate)}>+</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Задания</h2>
              <input
                className={styles.modalInput}
                type="text"
                placeholder="Поиск по содержанию"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>

            <div className={styles.taskList}>
              <div className={styles.tableModal}>
                <span className={styles.first}></span>
                <span>Номер</span>
                <span>Текст задания</span>
              </div>
              <div className={styles.tableBodyM}>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task._id}>
                      <div className={styles.taskItem}>
                        <span
                          className={selectedTasks.includes(task._id) ? styles.selected : ""}
                          onClick={() => toggleTaskSelection(task._id)}
                        >
                          {selectedTasks.includes(task._id) ? (
                            <i className="fa-solid fa-circle-check"></i>
                          ) : (
                            <i className="fa-solid fa-circle"></i>
                          )}
                        </span>
                        <span className={styles.taskID}>{task.taskNumber}</span>
                        <span className={styles.taskText}>{task.taskText}</span>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div className={styles.noResultsContainer}>
                    <div className={styles.noResults}>—</div>
                    <div className={styles.noResults}>Ничего не найдено</div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.modalBottom}>
              <button onClick={saveAssignments}>Сохранить</button>
              <span className={styles.closeButton} onClick={() => setModalOpen(false)}>×</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BDCandidates;
