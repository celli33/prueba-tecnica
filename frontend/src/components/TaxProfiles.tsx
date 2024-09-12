import React, { useEffect, useState } from 'react';
import TaxProfileModalForm from './TaxProfileModalForm.js';
import Notification from './Notification.js';
import ZipFileUploaderModal from './ZipFileUploaderModal.js';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.js';
import { fetchTaxProfiles, setCurrentPage } from '../store/itemsSlice.js';
import Pagination from './Pagination.js';

const TaxProfiles: React.FC = () => {
  const [isTaxProfileModalOpen, setIsTaxProfileModalOpen] = useState(false);
  const [isFileUploaderModalOpen, setIsFileUploaderModalOpen] = useState(false);

  const [notification, setNotification] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const { items, currentPage, lastPage, loading, error } = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTaxProfiles(currentPage));
  }, [dispatch, currentPage]);


  const openTaxProfileModalOpen = () => setIsTaxProfileModalOpen(true);
  const openFileUploaderModal = () => setIsFileUploaderModalOpen(true);

  const closeModals = () => {
    setIsTaxProfileModalOpen(false);
    setIsFileUploaderModalOpen(false);
  };

  const handleSuccess = (message: string) => {
    setNotification({ message, success: true });
  };

  const handleError = (message: string) => {
    setNotification({ message, success: false });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <React.Fragment>
      <div className="container mx-auto mt-10">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl font-bold mb-5">Listado de perfiles</h1>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={openTaxProfileModalOpen}
            >
              Crear nuevo perfil
            </button>

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-3"
              onClick={openFileUploaderModal}
            >
              Subir archivo
            </button>
          </div>
        </div>
      </div>
      {loading ? <p>Cargando...</p> : error ? <p>Error {error}</p> : <div>
      <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">RFC</th>
                  <th className="py-2 px-4 border-b">Regimen fiscal</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.rfc}</td>
                    <td className="py-2 px-4 border-b">{item.taxRegimeCode}</td>
                    <td className="py-2 px-4 border-b">
                      <button

                        className="px-3 py-2 text-xs font-medium text-center text-blue-700 cursor-pointer"
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-center">
              <Pagination
                totalPages={lastPage}
                currentPage={currentPage}
                paginate={handlePageChange}
              />
            </div>
      </div>}

      <TaxProfileModalForm
        isOpen={isTaxProfileModalOpen}
        onClose={closeModals}
        onSuccess={handleSuccess}
        onError={handleError}
      ></TaxProfileModalForm>
      <ZipFileUploaderModal
        isOpen={isFileUploaderModalOpen}
        onClose={closeModals}
        onSuccess={handleSuccess}
        onError={handleError}
      ></ZipFileUploaderModal>
      {notification && (
        <Notification
          message={notification.message}
          success={notification.success}
          duration={3000}
          onClose={handleCloseNotification}
        />
      )}
    </React.Fragment>
  );
};

export default TaxProfiles;
