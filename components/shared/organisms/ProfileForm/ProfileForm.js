import React, { useState } from 'react';
import useUpdateUser from 'lib/apollo/hooks/actions/useUpdateUser';
import usePresignFile from 'lib/apollo/hooks/actions/usePresignFile';
import { useFileUpload } from 'hooks/useFileUpload';
import ErrorDecorator from 'decorators/ErrorDecorator';
import useNotifier from 'hooks/useNotifier';
import ProfileFormContent from './ProfileFormContent';

const ProfileForm = ({ profile }) => {
  const { setSuccess } = useNotifier();
  const [updateUser] = useUpdateUser();
  const [presignFile] = usePresignFile();
  const [uploadFile] = useFileUpload();

  const [avatar, setAvatar] = useState(undefined);
  const [temporaryUrl, setTemporaryUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (event) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = event;

    if (validity.valid) {
      setAvatar(file);
      setTemporaryUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus('');
    setSubmitting(true);
    setLoading(true);

    try {
      let uploadedAvatar;
      if (avatar) {
        const presignData = await presignFile({ type: avatar.type, filename: avatar.name });
        uploadedAvatar = await uploadFile(presignData, avatar);
      }
      await updateUser({ ...values, avatar: uploadedAvatar });
      setLoading(false);
      setSuccess('Profile updated successfully');
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).getMessages();
      setLoading(false);
      setStatus(errorMsg);
    }

    setSubmitting(false);
  };

  return (
    <ProfileFormContent
      temporaryUrl={temporaryUrl}
      profile={profile}
      onSubmit={onSubmit}
      handleAvatarChange={handleAvatarChange}
      loading={loading}
    />
  );
};
export default ProfileForm;
