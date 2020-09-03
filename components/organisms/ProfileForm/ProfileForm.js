import React, { useState } from 'react';
import { useUpdateUser, usePresignFile, useFileUpload } from 'lib/apollo/hooks/actions';
import ErrorDecorator from 'decorators/ErrorDecorator';
import useNotifier from 'hooks/useNotifier';
import ProfileFormContent from './ProfileFormContent';

const ProfileForm = ({ profile }) => {
  const { setSuccess } = useNotifier();
  const [updateUser] = useUpdateUser();
  const [presignFile] = usePresignFile();
  const [uploadFile] = useFileUpload();

  const [avatar, setAvatar] = useState({});

  const handleAvatarChange = event => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = event;
    if (validity.valid) setAvatar(file);
  };

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus('');
    setSubmitting(true);

    try {
      const presignData = await presignFile({ type: avatar.type, filename: avatar.name });
      await uploadFile(presignData);
      await updateUser({ ...values });
      setSuccess('Profile updated successfully');
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).getMessages();
      setStatus(errorMsg);
    }

    setSubmitting(false);
  };

  return <ProfileFormContent profile={profile} onSubmit={onSubmit} handleAvatarChange={handleAvatarChange} />;
};
export default ProfileForm;
