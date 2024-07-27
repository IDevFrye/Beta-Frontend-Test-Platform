import React, { useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import styles from "./BDTasks.module.scss";

const BDTasks = () => {
  const [tasks, setTasks] = useState([
    { id: "100", text: "Получить массив подстрок из строки по заданному разделителю" },
    { id: "101", text: "Преобразовать таблицу значений в массив строки" },
    { id: "102", text: "Написать функцию, которая соберет строку из элементов массива" },
    { id: "103", text: "Преобразовать таблицу значений в массив строки" },
    { id: "104", text: "Преобразовать таблицу значений в определитель матрицы" },
    { id: "105", text: "Преобразовать таблицу значений в строку собственных значений матрицы" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [editableTask, setEditableTask] = useState(null);
  const [newTask, setNewTask] = useState(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setEditableTask(null);
    setNewTask(null);
  };

  const addTask = () => setNewTask({ id: "", text: "", isNew: true });
  const editTask = (task) => setEditableTask({ ...task });

  const saveTask = (task) => {
    if (task.isNew) {
      setTasks([...tasks, { id: task.id, text: task.text }]);
      setNewTask(null);
    } else {
      setTasks(tasks.map(t => (t.id === task.id ? { ...task, isNew: undefined } : t)));
      setEditableTask(null);
    }
  };

  const deleteTask = (task) => setTasks(tasks.filter(t => t.id !== task.id));

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <main className={styles.mainContent}>
        <hr className={styles.mainHR}></hr>
        <h1>База заданий</h1>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.first}>Номер задания</span>
            <span>Текст задания</span>
          </div>
          <div className={styles.tableBody}>
            {tasks.map((task) => (
              <div key={task.id} className={styles.tableRow}>
                <span className={styles.first}>{task.id}</span>
                <span>{task.text}</span>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.editButton} onClick={openModal}>Редактировать</button>
      </main>
      <Footer />

      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Редактор БД</h2>
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
                <span>Номер</span>
                <span>Текст задания</span>
              </div>
              <div className={styles.tableBodyM}>
                {filteredTasks.length === 0 ? (
                  <div className={styles.noResultsContainer}>
                    <div className={styles.noResults}>—</div>
                    <div className={styles.noResults}>Ничего не найдено</div>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div key={task.id} className={styles.taskItem}>
                      {editableTask && editableTask.id === task.id ? (
                        <>
                          <input
                            type="text"
                            value={editableTask.id}
                            onChange={(e) =>
                              setEditableTask({ ...editableTask, id: e.target.value })
                            }
                            className={styles.editInput}
                          />
                          <input
                            type="text"
                            value={editableTask.text}
                            onChange={(e) =>
                              setEditableTask({ ...editableTask, text: e.target.value })
                            }
                            className={styles.editInput}
                          />
                          <div className={styles.taskItemCheck}>
                            <i className="fa fa-check" onClick={() => saveTask(editableTask)}></i>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className={styles.taskItemID}>{task.id}</span>
                          <span className={styles.taskItemTEXT}>{task.text}</span>
                          <div className={styles.taskItemPencil}>
                            <i className="fa fa-pencil" onClick={() => editTask(task)}></i>
                          </div>
                          <div className={styles.taskItemTrash}>
                            <i className="fa fa-trash" onClick={() => deleteTask(task)}></i>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
                {newTask && (
                  <div className={styles.taskItem}>
                    <input
                      type="text"
                      value={newTask.id}
                      onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}
                      className={styles.editInput}
                    />
                    <input
                      type="text"
                      value={newTask.text}
                      onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
                      className={styles.editInput}
                    />
                    <div className={styles.taskItemCheck}>
                      <i className="fa fa-check" onClick={() => saveTask(newTask)}></i>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.modalBottom}>
              <div className={styles.modalPlus}>
                <i className="fa fa-plus" onClick={addTask}></i>
              </div>
              <button onClick={closeModal}>Завершить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BDTasks;
