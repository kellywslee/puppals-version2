import { useState } from 'react';
import ProfileForm from './ProfileForm';
import Modal from '../../ui/Modal';

const EditProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen((show) => !show)}
        className="mb-2 h-auto w-auto rounded-lg bg-org px-2 py-1 transition-all duration-300 hover:bg-orange-400 hover:font-bold"
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
