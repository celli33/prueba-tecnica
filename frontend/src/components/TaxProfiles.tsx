import React, { useState } from 'react';
import TaxProfileModalForm from './TaxProfileModalForm.js';
import Notification from './Notification.js';

const TaxProfiles: React.FC = () => {
  const [isTaxProfileModalOpen, setIsTaxProfileModalOpen] = useState(false);

  const [notification, setNotification] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const openTaxProfileModalOpen = () => setIsTaxProfileModalOpen(true);

  const closeModals = () => {
    setIsTaxProfileModalOpen(false);
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

            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-3">Subir archivo</button>
          </div>
        </div>
      </div>

      <TaxProfileModalForm
        isOpen={isTaxProfileModalOpen}
        onClose={closeModals}
        onSuccess={handleSuccess}
        onError={handleError}
      ></TaxProfileModalForm>
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
