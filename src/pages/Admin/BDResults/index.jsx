import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import styles from "./BDResults.module.scss";
import ava from "../../../assets/Main_Logo.png";

const BDResults = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterDates, setFilterDates] = useState({ from: "", to: "" });
  const [filterLastWeek, setFilterLastWeek] = useState(false);
  const [filterLastMonth, setFilterLastMonth] = useState(false);
  const [filterTaskNumber, setFilterTaskNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // Новое состояние для фильтрации по статусу

  useEffect(() => {
    axios.get("/admin-get-solutions")
      .then((response) => {
        const data = response.data;
        const transformedResults = data.flatMap((candidate) =>
          candidate.tasks.map((task) => ({
            id: `${candidate.name}-${task.taskNumber || Date.now()}`, 
            avatar: candidate.avatarUrl || ava,
            name: `${candidate.surname} ${candidate.name} ${candidate.patro}`,
            date: formatDate(task.firstUpdate),
            taskNumber: task.taskNumber || "Unknown", 
            score: task.mark,
            status: task.status,
            nam: candidate.name,
            surname: candidate.surname,
            patro: candidate.patro,
          }))
        );
        console.log(transformedResults);
        setResults(transformedResults);
        setFilteredResults(transformedResults);
      })
      .catch((error) => console.error("Error fetching solutions:", error));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterDates, filterLastWeek, filterLastMonth, filterTaskNumber, filterName, filterStatus]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const clearFilters = () => {
    setFilterDates({ from: "", to: "" });
    setFilterLastWeek(false);
    setFilterLastMonth(false);
    setFilterTaskNumber("");
    setFilterName("");
    setFilterStatus(""); // Сброс фильтра по статусу
  };

  const handleDateChange = (e) => {
    setFilterDates({ ...filterDates, [e.target.name]: e.target.value });
    setFilterLastWeek(false);
    setFilterLastMonth(false);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const today = new Date();
    if (name === "lastWeek" && checked) {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      setFilterDates({ from: lastWeek.toISOString().split("T")[0], to: today.toISOString().split("T")[0] });
      setFilterLastWeek(true);
      setFilterLastMonth(false);
    } else if (name === "lastMonth" && checked) {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      setFilterDates({ from: lastMonth.toISOString().split("T")[0], to: today.toISOString().split("T")[0] });
      setFilterLastWeek(false);
      setFilterLastMonth(true);
    } else {
      setFilterLastWeek(false);
      setFilterLastMonth(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskNumber") setFilterTaskNumber(value);
    if (name === "name") setFilterName(value);
    if (name === "status") setFilterStatus(value); // Обработка изменения статуса
  };

  const applyFilters = () => {
    let filtered = results;

    if (filterDates.from && filterDates.to) {
      filtered = filtered.filter((result) => {
        const resultDate = new Date(result.date.split("/")[0]);
        return resultDate >= new Date(filterDates.from) && resultDate <= new Date(filterDates.to);
      });
    }

    if (filterTaskNumber) {
      filtered = filtered.filter((result) => result.taskNumber.toString().includes(filterTaskNumber));
    }

    if (filterName) {
      filtered = filtered.filter((result) => result.name.toLowerCase().includes(filterName.toLowerCase()));
    }

    if (filterStatus) {
      filtered = filtered.filter((result) => result.status === filterStatus);
    }

    setFilteredResults(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 10); 
    const formattedTime = date.toTimeString().slice(0, 5); 
    return `${formattedDate}/${formattedTime}`;
  };

  const getScoreColor = (score) => {
  if (score === -1) return `${styles.gray} ${styles.score}`;
  if (score >= 0 && score <= 4) return `${styles.red} ${styles.score}`;
  if (score >= 5 && score <= 7) return `${styles.yellow} ${styles.score}`;
  return `${styles.green} ${styles.score}`;
};


  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <main className={styles.mainContent}>
        <hr className={styles.mainHR} />
        <div className={styles.header}>
          <h1>База решений</h1>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.buttonContainer}>
            <button className={`${styles.clearButton} ${!isFilterOpen ? styles.closed : ""}`} onClick={clearFilters}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button className={`${styles.filterButton} ${isFilterOpen ? styles.active : ""}`} onClick={toggleFilter}>
              <i className="fa-solid fa-sliders"></i> Настройка
            </button>
          </div>
          {isFilterOpen && (
            <div className={styles.filterPanel}>
              <div className={styles.firstPart}>
                <div className={styles.firstSubPart}>
                  <label>
                    с
                    <input
                      type="date"
                      name="from"
                      value={filterDates.from}
                      onChange={handleDateChange}
                      disabled={filterLastWeek || filterLastMonth}
                    />
                  </label>
                  <label>
                    по
                    <input
                      type="date"
                      name="to"
                      value={filterDates.to}
                      onChange={handleDateChange}
                      disabled={filterLastWeek || filterLastMonth}
                    />
                  </label>
                </div>
                <div className={styles.secondSubPart}>
                  <label>
                    <input
                      type="checkbox"
                      name="lastWeek"
                      checked={filterLastWeek}
                      onChange={handleCheckboxChange}
                    />
                    Последняя неделя
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="lastMonth"
                      checked={filterLastMonth}
                      onChange={handleCheckboxChange}
                    />
                    Последний месяц
                  </label>
                </div>
              </div>
              <div className={styles.firstPart}>
                <label>
                  Номер задания:
                  <input
                    type="text"
                    name="taskNumber"
                    value={filterTaskNumber}
                    onChange={handleFilterChange}
                    placeholder="Введите номер"
                  />
                </label>
                <label>
                  ФИО кандидата:
                  <input
                    type="text"
                    name="name"
                    value={filterName}
                    onChange={handleFilterChange}
                    placeholder="Введите ФИО"
                  />
                </label>
                <label>
                  Статус:
                  <select
                    name="status"
                    value={filterStatus}
                    onChange={handleFilterChange}
                  >
                    <option value="">Все</option>
                    <option value="assigned">Назначено</option>
                    <option value="checking">На проверке</option>
                    <option value="graded">Проверено</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
    <span className={styles.first}>ФИО</span>
    <span>Дата отправки</span>
    <span>Статус</span>
    <span>Задание</span>
    <span>Оценка</span>
    <span>Подробнее</span>
</div>
{filteredResults.length > 0 ? (
    <div className={styles.tableBody}>
        {filteredResults.map((result) => (
            <div
                key={result.id}
                className={`${styles.tableRow} ${result.taskNumber === "Удалено" ? styles.highlightedRow : ""}`} 
            >
                <span className={styles.first}>
                    <div className={styles.ava} style={{ backgroundImage: `url(${result.avatar})` }}></div>
                    <span className={styles.name}>{result.name}</span>
                </span>
                <span className={styles.date}>{result.date}</span>
                <span className={result.status === "assigned" ? styles.status : (result.status === "checking" ? styles.checking : styles.checked)}>
                  {result.status === "assigned" ? "Назначено" : (result.status === "checking" ? "На проверке" : "Проверено")}
                </span>
                <span className={(result.taskNumber === "Удалено") ? `${styles.deletedTaskNumber}` : `${styles.taskNumber}`}>
                    {result.taskNumber === "Unknown" ? "Удалено" : result.taskNumber}
                </span>
                <span className={getScoreColor(result.score)}>
                    {result.score === -1 ? "—" : result.score}
                </span>
                
                <Link 
                    className={` ${result.taskNumber === "Удалено" || result.status === "assigned" ? styles.displayNoneB : styles.detailsButton}`}
                    to={`/admin/bdresult/${result.taskNumber}?name=${encodeURIComponent(result.nam)}&surname=${encodeURIComponent(result.surname)}&patro=${encodeURIComponent(result.patro)}`}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
            </div>
        ))}
    </div>
) : (
    <div className={styles.noResultsContainer}>
        <div className={styles.noResults}>—</div>
        <div className={styles.noResults}>—</div>
        <div className={styles.noResults}>—</div>
        <div className={styles.noResults}>—</div>
        <div className={styles.noResults}>—</div>
        <div className={styles.noResults}>Ничего не найдено</div>
    </div>
)}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BDResults;
