import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '../axiosConfig.js';
import DatePicker from 'react-datepicker';

interface Response {
  sumIvaIssued: number;
  sumIvaReceived: number;
  toPayOrDeduce: number;
  isPay: boolean;
}

const MonthPickerModal: React.FC<{
  isOpen: boolean;
  id: number | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}> = ({ isOpen, id, onClose, onSuccess, onError }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [response, setResponse] = useState<Response | null>(null);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setSelectedMonth(format(date, 'MM-yyyy'));
    } else {
      setSelectedMonth(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (selectedMonth) {
      try {
        const { data } = await axiosInstance.post(`iva-calculo/${id}`, {
          date: selectedMonth,
        });

        onSuccess(data?.message);
        setResponse(data.data);
      } catch (err: any) {
        onError(err?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setResponse(null);
      setStartDate(null);
      setSelectedMonth(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-1/3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Seleccionar Mes</h2>
        {/*** @ts-ignore */}
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <p className="mt-4 text-lg">
          {selectedMonth ? `Mes seleccionado: ${selectedMonth}` : 'Ningún mes seleccionado'}
        </p>
        <div className="mt-4 text-lg">
          {response && (
            <>
              <p>
                Iva emitido: {response.sumIvaIssued} <br />
                Iva recibido: {response.sumIvaReceived}
                <br />
                {response.isPay ? 'Por pagar' : 'Por deducir'}: {response.toPayOrDeduce}
              </p>
            </>
          )}
        </div>
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
              selectedMonth ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedMonth}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default MonthPickerModal;
