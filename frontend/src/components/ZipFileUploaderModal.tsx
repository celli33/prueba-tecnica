import React, { useState } from 'react';
import ZipFileUploader from './ZipFileUploader.js';
import axiosInstance from '../axiosConfig.js';
import { AxiosError } from 'axios';
import Error422 from '../interfaces/Error422.js';

const ZipFileUploaderModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}> = ({ isOpen, onClose, onSuccess, onError }) => {
  const [isFileValid, setIsFileValid] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileValid = (isValid: boolean) => {
    setIsFileValid(isValid);
  };

  const handleFileUpload = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = async (element: React.FormEvent) => {
    element.preventDefault();
    if (isFileValid && file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const { data } = await axiosInstance.post('facturas', formData, config);

        onSuccess(data?.message);
        onClose();
        setUploadError(null);
      } catch (error) {
        if ((error as AxiosError).isAxiosError) {
          const axError = error as AxiosError;
          const errors = axError.response?.data as { errors: Error422[] };
          onError(errors.errors[0].message);
        }
        onError('Error al cargar archivo zip.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-1/3"
      >
        <h2 className="text-2xl font-bold mb-4">Subir Archivo .zip</h2>
        <ZipFileUploader
          setFile={handleFileUpload}
          setFileValid={handleFileValid}
        ></ZipFileUploader>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              isFileValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!isFileValid}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ZipFileUploaderModal;
