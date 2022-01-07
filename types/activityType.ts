import { ID } from 'api/types/common';

export type Activity = {
  id: ID;
  title: string;
  description: string;
  date: string;
  color: string | undefined;
  name: string;
  email: string;
  avatarUrl: string | null;
};
