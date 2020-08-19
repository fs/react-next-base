import React, { useState } from 'react';
import { useUpdateUser } from 'lib/apollo/hooks/actions';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ProfileFormContent from './ProfileFormContent';

const ProfileForm = ({ profile }) => {
  const [updateUser] = useUpdateUser();
  const [fieldValue, setFieldValue] = useState(undefined);

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    const updatedValues = {
      ...values,
      avatar: {
        id: fieldValue.name,
        fieldValue: {
          size: fieldValue.size,
          filename: fieldValue.name,
          mimeType: fieldValue.type,
        },
      },
    };
    setStatus('');
    setSubmitting(true);
    try {
      await updateUser(updatedValues);
    } catch (error) {
      const errorMsg = new ErrorDecorator(error).getMessages();
      setStatus(errorMsg);
    }
    setSubmitting(false);
  };

  return <ProfileFormContent profile={profile} onSubmit={onSubmit} setFieldValue={setFieldValue} />;
};
export default ProfileForm;
