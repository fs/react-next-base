export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  date: string;
  color: string | undefined;
  name: string;
  email: string;
  avatarUrl: string | null;
};
