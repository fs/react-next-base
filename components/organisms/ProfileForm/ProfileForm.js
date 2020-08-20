import React from 'react';
import { useUpdateUser } from 'lib/apollo/hooks/actions';
import ErrorDecorator from 'decorators/ErrorDecorator';
import useNotifier from 'hooks/useNotifier';
import ProfileFormContent from './ProfileFormContent';

const ProfileForm = ({ profile }) => {
  const [updateUser] = useUpdateUser();
  const { setSuccess } = useNotifier();

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus('');
    setSubmitting(true);
    try {
      await updateUser(values);
      setSuccess('Profile updated successfully');
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).getMessages();
      setStatus(errorMsg);
    }
    setSubmitting(false);
  };

  return <ProfileFormContent profile={profile} onSubmit={onSubmit} />;
};
export default ProfileForm;
