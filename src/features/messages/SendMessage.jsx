import { useState } from 'react';
import ChatRoom from './ChatRoom';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

// eslint-disable-next-line react/prop-types
const SendMessage = ({ dogToSendMessage, user }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen((show) => !show)} type="primary">
        Message
      </Button>
      {isModalOpen && (
        <Modal title="Chat" onClose={() => setModalOpen(false)}>
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
