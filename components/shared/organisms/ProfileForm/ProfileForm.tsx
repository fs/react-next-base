import React, { ChangeEvent, useMemo, useState } from 'react';
import type { FormikHelpers } from 'formik';
import useUpdateUser from 'lib/apollo/hooks/actions/useUpdateUser';
import usePresignFile from 'lib/apollo/hooks/actions/usePresignFile';
import { useFileUpload } from 'hooks/useFileUpload';
import type { Uploaded } from 'hooks/useFileUpload';
import ErrorDecorator from 'decorators/ErrorDecorator';
import { useNotifier } from 'contexts/NotifierContext';
import User from 'domain/User';
import ProfileFormContent from './ProfileFormContent';

type Props = {
  profile: User;
};

const ProfileForm = ({ profile }: Props) => {
  const { setSuccess } = useNotifier();
  const [updateUser] = useUpdateUser();
  const [presignFile] = usePresignFile();
  const [uploadFile] = useFileUpload();

  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const temporaryUrl = useMemo(() => (avatar ? URL.createObjectURL(avatar) : null), [avatar]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files },
    } = event;

    if (files === null) {
      setAvatar(undefined);
      return;
    }

    if (validity.valid) {
      setAvatar(files[0]);
    }
  };

  type ValuesFromFormik = Parameters<typeof updateUser>[0];

  const onSubmit = async (values: ValuesFromFormik, { setSubmitting, setStatus }: FormikHelpers<ValuesFromFormik>) => {
    setStatus('');
    setSubmitting(true);
    setLoading(true);

    try {
      let uploadedAvatar: Uploaded | undefined;
      if (avatar) {
        const presignData = await presignFile({ type: avatar.type, filename: avatar.name });

        if (!presignData) {
          throw new Error('Unsigned file');
        }

        uploadedAvatar = await uploadFile(presignData, avatar);
      }
      await updateUser({ ...values, avatar: uploadedAvatar });
      setLoading(false);
      setSuccess('Profile updated successfully');
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).message;
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
