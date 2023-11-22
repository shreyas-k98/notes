import React from 'react';
import './Modal.css';

export const AddNoteModal = (props) => {
  const {
    isOpen,
    onClose,
    modalBody,
    onSubmit
  } = props

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
        <div className={`modal ${isOpen ? 'show' : ''} modal-header`}>
          {modalBody()}
          <div className='modal-footer'>
            <button className="button" onClick={closeModal}>Close</button>
            <button className='button' onClick={onSubmit}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};