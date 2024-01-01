import { useState } from 'react';
import ProfileForm from './ProfileForm';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

// eslint-disable-next-line react/prop-types
const EditProfile = ({ dogToEdit }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen((show) => !show)} type="edit">
        Edit Profile
      </Button>
      {isModalOpen && (
        <Modal title="Update Profile" onClose={() => setModalOpen(false)}>
          <ProfileForm
            dogToEdit={dogToEdit}
            onCloseModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
