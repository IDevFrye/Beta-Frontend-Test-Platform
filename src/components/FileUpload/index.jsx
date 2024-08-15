import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "../../axios"; // Убедитесь, что путь правильный
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileUpload.module.scss";
import { jwtDecode } from "jwt-decode";

const FileUpload = ({ onSubmit }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
    }
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setIsDragActive(false);
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUpload = async () => {
    if (!uploadedFile || !userId) return;

    const formData = new FormData();
    formData.append("avatar", uploadedFile);

    try {
      const response = await axios.patch(`/user-patch-profile-avatar/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        alert("Аватар успешно загружен!");
      } else {
        throw new Error("Ошибка при загрузке аватара");
      }
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error);
      alert("Ошибка при загрузке аватара");
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <div
        {...getRootProps({
          className: `${styles.dropzone} ${isDragActive ? styles.active : ""}`,
        })}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Preview" className={styles.preview} draggable="false"/>
        ) : (
          <>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faFileArrowUp} />
            </div>
            <button type="button" onClick={open}>
              PNG, JPG или JPEG. Макс 1Гб.
            </button>
          </>
        )}
      </div>
      {uploadedFile && <p>{uploadedFile.name}</p>}
      <button type="button" onClick={handleUpload}>
        Загрузить
      </button>
    </div>
  );
};

export default FileUpload;
