import React, { useState, useEffect } from 'react';
import TaxProfile from '../interfaces/TaxProfile.js';

const TaxProfileModalDetails: React.FC<{
  isOpen: boolean;
  profileDetails: TaxProfile | null;
  onClose: () => void;
}> = ({ isOpen, profileDetails, onClose }) => {
  const [profile, setProfile] = useState<TaxProfile>({
    id: 0,
    name: '',
    rfc: '',
    taxRegimeCode: '',
  });

  useEffect(() => {
    if (profileDetails) {
      setProfile(profileDetails);
    }
  }, [profileDetails]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Detalles del perfil</h2>
        <div>
          <div className="mb-4">ID: {profile.id}</div>
          <div className="mb-4">Nombre: {profile.name}</div>
          <div className="mb-4">RFC: {profile.rfc}</div>
          <div className="mb-4">Regimen fiscal: {profile.taxRegimeCode}</div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxProfileModalDetails;
