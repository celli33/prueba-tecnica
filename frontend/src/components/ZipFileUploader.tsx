import React, { useState } from 'react';

const ZipFileUploader: React.FC<{
  setFileValid: (isValid: boolean) => void;
  setFile: (file: File | null) => void;
}> = ({ setFileValid, setFile }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type === 'application/zip') {
        setFileName(file.name);
        setError(null);
        setFileValid(true);
        setFile(file);
      } else {
        setFileName(null);
        setError('Solo se permiten archivos .zip');
        setFileValid(false);
        setFile(null);
      }
    } else {
      setFileName(null);
      setFileValid(false);
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.59,7.41,11,1.83V6a1,1,0,0,1-1,1H6.83l5.76,5.76L16.59,7.41ZM9.29,8.71a1,1,0,0,0-1.41,0L1,15.59V19h3.41l6.88-6.88A1,1,0,0,0,9.29,8.71ZM0,17.17,2.83,14.34,5.17,16.59,2.34,19.41ZM19,4H14V0H2A2,2,0,0,0,0,2V14a2,2,0,0,0,2,2H6v3.59L9.59,16H18a2,2,0,0,0,2-2V4Zm-2,2V16H9.41L6,12.59V4H17Z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Cargar archivo .zip</span>
        <input
          type="file"
          accept=".zip"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {fileName && <p className="mt-2 text-green-600">Archivo seleccionado: {fileName}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default ZipFileUploader;
