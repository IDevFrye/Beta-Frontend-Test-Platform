import React, { useState, useEffect } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import axios from "../../../axios"; // Импортируем axios для работы с запросами
import styles from "./BDTasks.module.scss";

const BDTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [editableTask, setEditableTask] = useState(null);
  const [newTask, setNewTask] = useState(null);

  useEffect(() => {
    // Загрузка задач при загрузке компонента
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/admin-get-bd-tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      }
    };
    fetchTasks();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setEditableTask(null);
    setNewTask(null);
  };

  const addTask = () => setNewTask({ taskNumber: "", taskText: "", isNew: true });
  const editTask = (task) => setEditableTask({ ...task });

  const saveTask = async (task) => {
    try {
      if (task.isNew) {
        // Добавление новой задачи через POST-запрос
        const response = await axios.post(`/admin-post-task-add/${task.taskNumber}`, {
          taskText: task.taskText,
        });
        setTasks([...tasks, response.data]);
        setNewTask(null);
      } else {
        await axios.patch(`/admin-patch-task-edit/${task.taskNumber}`, { taskText: task.taskText });
        setTasks(tasks.map(t => (t.taskNumber === task.taskNumber ? { ...task, isNew: undefined } : t)));
        setEditableTask(null);
      }
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
    }
  };

  const deleteTask = async (task) => {
    try {
      await axios.delete(`/admin-delete-task/${task.taskNumber}`);
      setTasks(tasks.filter(t => t.taskNumber !== task.taskNumber));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.taskText.toLowerCase().includes(filterText.toLowerCase())
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
              <div key={task.taskNumber} className={styles.tableRow}>
                <span className={styles.first}>{task.taskNumber}</span>
                <span>{task.taskText}</span>
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
                    <div key={task.taskNumber} className={styles.taskItem}>
                      {editableTask && editableTask.taskNumber === task.taskNumber ? (
                        <>
                          <input
                            type="text"
                            value={editableTask.taskNumber}
                            onChange={(e) =>
                              setEditableTask({ ...editableTask, taskNumber: e.target.value })
                            }
                            className={styles.editInput}
                          />
                          <input
                            type="text"
                            value={editableTask.taskText}
                            onChange={(e) =>
                              setEditableTask({ ...editableTask, taskText: e.target.value })
                            }
                            className={styles.editInput}
                          />
                          <div className={styles.taskItemCheck}>
                            <i className="fa fa-check" onClick={() => saveTask(editableTask)}></i>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className={styles.taskItemID}>{task.taskNumber}</span>
                          <span className={styles.taskItemTEXT}>{task.taskText}</span>
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
                      value={newTask.taskNumber}
                      onChange={(e) => setNewTask({ ...newTask, taskNumber: e.target.value })}
                      className={styles.editInput}
                    />
                    <input
                      type="text"
                      value={newTask.taskText}
                      onChange={(e) => setNewTask({ ...newTask, taskText: e.target.value })}
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
