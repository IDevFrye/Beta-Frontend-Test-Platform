import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import styles from "./BDResults.module.scss";
import ava from "../../../assets/Main_Logo.png";

const BDResults = () => {
  const [results, setResults] = useState([
    {
      id: 1,
      avatar: ava,
      name: "Коба Алексей Юрьевич",
      date: "2024-05-23/14:36",
      taskNumber: 1,
      score: 7,
    },
    {
      id: 2,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      date: "2024-06-11/15:00",
      taskNumber: 2,
      score: 8,
    },
    {
      id: 3,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      date: "2024-06-22/15:00",
      taskNumber: 3,
      score: 8,
    },
    {
      id: 4,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      date: "2024-06-23/15:00",
      taskNumber: 4,
      score: 8,
    },
    {
      id: 5,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      date: "2024-07-05/15:00",
      taskNumber: 5,
      score: 8,
    },
    {
      id: 6,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      date: "2024-07-10/15:00",
      taskNumber: 6,
      score: 8,
    },
    {
      id: 7,
      avatar: ava,
      name: "Мамонова Алина Сергеевна",
      date: "2024-07-24/15:00",
      taskNumber: 7,
      score: 8,
    },
    // Добавьте больше данных по аналогии
  ]);

  const [filteredResults, setFilteredResults] = useState(results);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterDates, setFilterDates] = useState({ from: "", to: "" });
  const [filterLastWeek, setFilterLastWeek] = useState(false);
  const [filterLastMonth, setFilterLastMonth] = useState(false);
  const [filterTaskNumber, setFilterTaskNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    applyFilters();
  }, [filterDates, filterLastWeek, filterLastMonth, filterTaskNumber, filterName]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const clearFilters = () => {
    setFilterDates({ from: "", to: "" });
    setFilterLastWeek(false);
    setFilterLastMonth(false);
    setFilterTaskNumber("");
    setFilterName("");
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

    setFilteredResults(filtered);
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
              <i class="fa-solid fa-xmark"></i>
            </button>
            <button className={`${styles.filterButton} ${isFilterOpen ? styles.active : ""} `} onClick={toggleFilter}>
              <i class="fa-solid fa-sliders"></i>Настройка
            </button>
          </div>
          {isFilterOpen && (
            <div className={styles.filterPanel}>
              <div className={styles.firstPart}>
                <div className={styles.firstSubPart}>
                  <label>
                    С
                    <input
                      type="date"
                      name="from"
                      value={filterDates.from}
                      onChange={handleDateChange}
                      disabled={filterLastWeek || filterLastMonth}
                    />
                  </label>
                  <label>
                    ПО
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
                    placeholder='Введите номер'
                  />
                </label>
                <label>
                  ФИО кандидата:
                  <input
                    type="text"
                    name="name"
                    value={filterName}
                    onChange={handleFilterChange}
                    placeholder='Введите ФИО'
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.first}>ФИО</span>
            <span>Дата отправки</span>
            <span>Задание</span>
            <span>Оценка</span>
            <span>Подробнее</span>
          </div>
          {filteredResults.length > 0 ? (
            <div className={styles.tableBody}>
              {filteredResults.map((result) => (
                <div key={result.id} className={styles.tableRow}>
                  <span className={styles.first}>
                    <div className={styles.ava}></div>
                    <span className={styles.name}>{result.name}</span>
                  </span>
                  <span className={styles.date}>{result.date}</span>
                  <span className={styles.taskNumber}>{result.taskNumber}</span>
                  <span className={styles.score}>{result.score}</span>
                  <Link to="/admin/bdresult" className={styles.detailsButton}>
                    <i class="fa-solid fa-chevron-right"></i>
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
