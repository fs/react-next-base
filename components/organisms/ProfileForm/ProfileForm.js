import React from 'react';
import { useUpdateUser } from 'lib/apollo/hooks/actions';
import ProfileFormContent from './ProfileFormContent';
import ErrorDecorator from 'decorators/ErrorDecorator';

const ProfileForm = ({ profile }) => {
  const [updateUser] = useUpdateUser();

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setSubmitting(true);

      await updateUser(values);

      setSubmitting(false);
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).getMessages();
      setStatus(errorMsg);
    }
  };

  return <ProfileFormContent profile={profile} onSubmit={onSubmit} />;
};
export default ProfileForm;
