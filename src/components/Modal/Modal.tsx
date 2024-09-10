import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { faExclamationCircle, faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  iconType: 'warning' | 'confirmation' | 'info';
  imageSrc?: string;
  onConfirm?: (arg?: any) => void;
  onCancel?: () => void;
  modalType: 'confirmation' | 'message';
  confirmArg?: any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  iconType,
  imageSrc,
  onConfirm,
  onCancel,
  modalType,
  confirmArg,
}) => {
  const { darkMode } = useTheme();

  const iconMap = {
    warning: faExclamationCircle,
    confirmation: faQuestionCircle,
    info: faInfoCircle,
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-75`}>
      <div className={`w-11/12 max-w-lg p-6 rounded-lg shadow-lg ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className='flex items-center mb-4'>
          <FontAwesomeIcon
            icon={iconMap[iconType]}
            className={`text-3xl mr-4 ${iconType === 'warning' ? 'text-red-500' : iconType === 'confirmation' ? 'text-yellow-500' : 'text-blue-500' }`}
          />
          <h2 className='text-2xl font-semibold'>{ title }</h2>
        </div>

        <div className="mb-4">
          {imageSrc ? (
            <>
              <img src={imageSrc} alt="modal-content" className='w-full h-auto mb-4' />
              <p className="text-lg">{ message }</p>
            </>
          ) : (
            <p className="text-lg">{ message }</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          {modalType === 'confirmation' ? (
            <>
              <button
                onClick={onCancel}
                className='px-4 py-2 bg-gray-300 rounded-lg font-medium hover:bg-gray-400 transition duration-300'
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm && onConfirm(confirmArg)}
                className='px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300'
              >
                Confirm
              </button>
            </>
          ) : (
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300'
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;