import { useState } from 'react';
import ProfileForm from './ProfileForm';
import Modal from '../../ui/Modal';

const EditProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen((show) => !show)}
        className="mb-2 h-10 w-full rounded-lg bg-org"
      >
        Edit Profile
      </button>
      {isModalOpen && (
        <Modal title="Update Profile" onClose={() => setModalOpen(false)}>
          <ProfileForm onCloseModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
