/* eslint-disable react/prop-types */
import { useState } from 'react';
import ChatRoom from './ChatRoom';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

const SendMessage = ({ dogToSendMessage, user, onClick }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMessageButtonClick = () => {
    if (onClick) {
      onClick();
    }
    setModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleMessageButtonClick} type="primary">
        Message
      </Button>
      {isModalOpen && (
        <Modal
          title={`Chat with ${dogToSendMessage.name}`}
          onClose={() => setModalOpen(false)}
        >
          <ChatRoom
            dogToSendMessage={dogToSendMessage}
            user={user}
            onCloseModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default SendMessage;
