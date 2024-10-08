import React, { useEffect, useState } from 'react';
import cfdi40RegimenesFiscales from '../utils/taxRegimes.js';
import { useDispatch } from 'react-redux';
import { addProfile } from '../store/itemsSlice.js';
import { AppDispatch } from '../store/store.js';

const TaxProfileModalForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}> = ({ isOpen, onClose, onSuccess, onError }) => {
  useEffect(() => {
    setFormData({
      name: '',
      rfc: '',
      taxRegimeCode: '',
    });
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: '',
    rfc: '',
    taxRegimeCode: '',
  });

  const handleChange = (element: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [element.target.name]: element.target.value,
    });
  };

  const handleSubmit = async (element: React.FormEvent) => {
    element.preventDefault();

    try {
      await dispatch(addProfile(formData)).unwrap();
      onSuccess('Perfil creado exitosamente.');
      onClose();
    } catch (error) {
      onError(error as string);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Crear Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">RFC</label>
            <input
              type="text"
              name="rfc"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Regimen fiscal</label>

            <select
              required
              name="taxRegimeCode"
              onChange={handleChange}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option
                selected
                value=""
              >
                Selecciona...
              </option>
              {cfdi40RegimenesFiscales.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.texto}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxProfileModalForm;
