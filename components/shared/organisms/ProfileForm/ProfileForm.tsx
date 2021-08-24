import React, { useState } from 'react';

import IUser from 'interfaces/userType';
import { IPresignFile } from 'interfaces/actionsType';

import { useUpdateUser, usePresignFile } from 'lib/apollo/hooks/actions/auth';
import { useFileUpload } from 'hooks/useFileUpload';
import useNotifier from 'hooks/useNotifier';

import ErrorDecorator from 'decorators/ErrorDecorator';

import ProfileFormContent from './ProfileFormContent';

interface Props {
  profile: IUser;
}

interface SubmitProps {
  setSubmitting: (arg: boolean) => void;
  setStatus: (arg: string) => void;
}

interface IAvatar {
  type: string;
  name: string;
}

const ProfileForm = ({ profile }: Props) => {
  const { setSuccess } = useNotifier();
  const [updateUser] = useUpdateUser();
  const [presignFile] = usePresignFile();
  const [uploadFile] = useFileUpload();

  const [avatar, setAvatar] = useState<IAvatar>({});
  const [temporaryUrl, setTemporaryUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const validity = target.validity;
    const file: File = (target.files as FileList)[0];

    if (validity.valid) {
      setAvatar(file);
      setTemporaryUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: IUser, { setSubmitting, setStatus }: SubmitProps) => {
    setStatus('');
    setSubmitting(true);
    setLoading(true);

    try {
      const presignData = await presignFile({ type: avatar.type, filename: avatar.name });
      const uploadedAvatar = await uploadFile(presignData, avatar);
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
