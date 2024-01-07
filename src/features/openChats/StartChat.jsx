/* eslint-disable react/prop-types */
import { useState } from 'react';
import OpenChatRoom from './OpenChatRoom';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

const StartChat = ({ chat }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen((show) => !show)}>
        Chat
      </Button>
      {isModalOpen && (
        <Modal title={`${chat.name}`} onClose={() => setModalOpen(false)}>
          <OpenChatRoom chat={chat} onCloseModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default StartChat;
