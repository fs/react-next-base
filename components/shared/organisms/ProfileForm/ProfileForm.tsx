import React, { useState } from 'react';

import IUser from 'interfaces/userType';

import { useUpdateUser } from 'lib/apollo/hooks/actions/auth';
import fileUpload from 'components/shared/organisms/ProfileForm/uploadAvatar';

import useNotifier from 'hooks/useNotifier';

import ErrorDecorator from 'decorators/ErrorDecorator';

import ProfileFormContent from './ProfileFormContent';
import { usePresignFile } from '../../../../lib/apollo/hooks/actions/auth/usePresignFile';

interface Props {
  profile: IUser;
}

interface SubmitProps {
  setSubmitting: (arg: boolean) => void;
  setStatus: (arg: string) => void;
}

const ProfileForm = ({ profile }: Props) => {
  const { setSuccess } = useNotifier();
  const [updateUser] = useUpdateUser();
  const [presignFile] = usePresignFile();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [temporaryUrl, setTemporaryUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const validity = target.validity;
    if (target.files) {
      const file = target.files[0];

      if (validity.valid) {
        setAvatar(file);
        setTemporaryUrl(URL.createObjectURL(file));
      }
    }
  };

  const onSubmit = async (values: IUser, { setSubmitting, setStatus }: SubmitProps) => {
    setStatus('');
    setSubmitting(true);
    setLoading(true);

    try {
      if (avatar) {
        const presignData = await presignFile({ type: avatar.type, filename: avatar.name });
        if (!presignData) {
          throw new Error(' presignData are empty');
        }
        const uploadedAvatar = await fileUpload(presignData, avatar);
        await updateUser({ ...values, avatar: uploadedAvatar });
      } else {
        await updateUser({ ...values });
      }
      setLoading(false);
      if (setSuccess) {
        setSuccess('Profile updated successfully');
      }
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
