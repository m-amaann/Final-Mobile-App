import React from "react";
import Modal from 'react-modal';


const NotificationModal = ({ isOpen, closeModal, notifications }) => {
    
    const renderNotifications = () => {
        return notifications.map((notification, index) => (
          <div key={index} className="notification">
            <p>{`Low stock: ${notification.name} - ${notification.quantity} left`}</p>
          </div>
        ));
      };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="notification-modal"
      overlayClassName="notification-overlay"
    >
      <div className="modal-content">
        <h2 className="notification-heading">Notifications</h2>
        {renderNotifications()}
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
