import { useState } from 'react';
import ChatForm from './ChatForm';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

// eslint-disable-next-line react/prop-types
const CreateChat = ({ chatToCreate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setModalOpen((show) => !show)} type="edit">
        + Create Group Chat
      </Button>
      {isModalOpen && (
        <Modal title="Create Group Chat" onClose={() => setModalOpen(false)}>
          <ChatForm
            chatToEdit={chatToCreate}
            onCloseModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateChat;
