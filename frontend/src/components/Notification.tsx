import React, { useEffect } from 'react';

const Notification: React.FC<{ message: string; success: boolean; duration: number; onClose: () => void }> = ({
  message,
  success,
  duration,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white ${success ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
