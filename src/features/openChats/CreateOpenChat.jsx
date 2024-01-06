import { useState } from 'react';
import ChatForm from './OpenChatForm';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

// eslint-disable-next-line react/prop-types
const CreateOpenChat = ({ chatToCreate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setModalOpen((show) => !show)} type="edit">
        + Create Chat
      </Button>
      {isModalOpen && (
        <Modal title="Create Open Chat" onClose={() => setModalOpen(false)}>
          <ChatForm
            chatToEdit={chatToCreate}
            onCloseModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateOpenChat;
