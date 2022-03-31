import { ActivityEvent } from '__generated__/globalTypes';

export default [
  { value: ActivityEvent.USER_LOGGED_IN, name: 'User logged in', color: '#00e676' },
  { value: ActivityEvent.USER_REGISTERED, name: 'User registered', color: '#f50057' },
  { value: ActivityEvent.USER_RESET_PASSWORD, name: 'User reset password', color: '#d500f9' },
  { value: ActivityEvent.RESET_PASSWORD_REQUESTED, name: 'Reset password requested', color: '#ffea00' },
  { value: ActivityEvent.USER_UPDATED, name: 'User updated', color: '#2979ff' },
];
