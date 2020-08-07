import React from 'react';
import { useUpdateUser } from 'lib/apollo/hooks/actions/actions';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ProfileFormContent from './ProfileFormContent';

const ProfileForm = ({ profile }) => {
  const [updateUser] = useUpdateUser();

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus('');
    setSubmitting(true);
    try {
      await updateUser(values);
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).getMessages();
      setStatus(errorMsg);
    }
    setSubmitting(false);
  };

  return <ProfileFormContent profile={profile} onSubmit={onSubmit} />;
};
export default ProfileForm;
