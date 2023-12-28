import { useState } from 'react';
import ProfileForm from './ProfileForm';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

const EditProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button type="edit" onClick={() => setModalOpen((show) => !show)}>
        Edit
      </Button>
      {isModalOpen && (
        <Modal title="Update Profile" onClose={() => setModalOpen(false)}>
          <ProfileForm onCloseModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
