import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileUpload.module.scss";

const FileUpload = ({ onSubmit }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setIsDragActive(false);
    setPreview(URL.createObjectURL(file));
  };

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive: dropzoneIsDragActive,
  } = useDropzone({
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

  return (
    <div className={styles.fileUploadContainer}>
      <div
        {...getRootProps({
          className: `${styles.dropzone} ${isDragActive ? styles.active : ""}`,
        })}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Preview" className={styles.preview} />
        ) : (
          <>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faFileArrowUp} />
            </div>
            <button type="button" onClick={open}>
            PNG, JPG or JPEG. Max 1Gb.
            </button>
          </>
        )}
      </div>
      {uploadedFile && (
        <div>
          <p>{uploadedFile.name}</p>
        </div>
      )}
      <button type="button" onClick={() => onSubmit(uploadedFile)}>
        Загрузить
      </button>
    </div>
  );
};

export default FileUpload;
