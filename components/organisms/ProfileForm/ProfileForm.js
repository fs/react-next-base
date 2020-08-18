import React, { useState } from 'react';
import { useUpdateUser } from 'lib/apollo/hooks/actions';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ProfileFormContent from './ProfileFormContent';

const ProfileForm = ({ profile }) => {
  const [updateUser] = useUpdateUser();
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = event => {
    console.log(event);
    const {
      target: {
        validity,
        files: [file],
      },
    } = event;

    if (validity.valid) console.log(setAvatar(file));
  };

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus('');
    setSubmitting(true);
    try {
      // await updateUser(values);
      console.log(values);
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).getMessages();
      setStatus(errorMsg);
    }
    setSubmitting(false);
  };

  return <ProfileFormContent profile={profile} onSubmit={onSubmit} handleAvatarChange={handleAvatarChange} />;
};
export default ProfileForm;
