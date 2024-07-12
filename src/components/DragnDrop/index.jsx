import React from 'react';
import { useDropzone } from 'react-dropzone';
const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone();
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop files here or click to browse.</p>
    </div>
  );
};
export default FileUpload;