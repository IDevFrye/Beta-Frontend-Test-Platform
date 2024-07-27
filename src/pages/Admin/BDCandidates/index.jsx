import React, { useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import styles from "./BDCandidates.module.scss";
import ava from "../../../assets/Main_Logo.png";

const BDCandidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      avatar: ava,
      name: "Коба Алексей Юрьевич",
      taskCount: 5,
      averageScore: 10,
    },
    {
      id: 2,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      taskCount: 5,
      averageScore: 10,
    },
    {
      id: 2,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      taskCount: 5,
      averageScore: 10,
    },
    {
      id: 2,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      taskCount: 5,
      averageScore: 10,
    },
    {
      id: 2,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      taskCount: 5,
      averageScore: 10,
    },
    {
      id: 2,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      taskCount: 5,
      averageScore: 10,
    },
    // Добавьте больше данных по аналогии
  ]);
  const [tasks, setTasks] = useState([
    { id: 100, text: "Получить массив подстрок из строки по заданному разделителю" },
    { id: 101, text: "Преобразовать таблицу значений в массив строки" },
    { id: 102, text: "Написать функцию, которая соберет строку из элементов массива" },
    { id: 103, text: "Написать функцию, которая соберет строку из элементов массива" },
    { id: 104, text: "Написать функцию, которая соберет строку из элементов массива" },
    { id: 105, text: "Написать функцию, которая соберет строку из элементов массива" },
    { id: 106, text: "Написать функцию, которая соберет строку из элементов массива" },
    { id: 1077, text: "Написать функцию, которая соберет строку из элементов массива" },
    // Добавьте больше задач по аналогии
  ]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCandidateId, setCurrentCandidateId] = useState(null);

  const openModal = (candidateId) => {
    setCurrentCandidateId(candidateId);
    setModalOpen(true);
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter((id) => id !== taskId)
        : [...prevSelectedTasks, taskId]
    );
  };

  const saveAssignments = () => {
    // Здесь должен быть API вызов для сохранения данных
    setModalOpen(false);
    setSelectedTasks([]);
  };

  const filteredTasks = tasks.filter((task) => task.text.toLowerCase().includes(filterText.toLowerCase()));

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
              <div key={candidate.id} className={styles.tableRow}>
                <span className={styles.first}>
                  <div className={styles.ava}></div>
                  <span className={styles.name}>{candidate.name}</span>
                </span>
                <span className={styles.count}>{candidate.taskCount}</span>
                <span className={styles.average}>{candidate.averageScore}</span>
                <span className={styles.assignButton} onClick={() => openModal(candidate.id)}>+</span>
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
                    <div key={task.id}>
                      <div className={styles.taskItem}>
                        <span
                          className={selectedTasks.includes(task.id) ? styles.selected : ""}
                          onClick={() => toggleTaskSelection(task.id)}
                        >
                          {selectedTasks.includes(task.id) ? (
                            <i className="fa-solid fa-circle-check"></i>
                          ) : (
                            <i className="fa-solid fa-circle"></i>
                          )}
                        </span>
                        <span className={styles.taskID}>{task.id}</span>
                        <span className={styles.taskText}>{task.text}</span>
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
