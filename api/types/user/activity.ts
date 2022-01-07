import type { ID, PageInfo } from '../common';
import type { CurrentUser } from './user';

export type Activity = {
  id: ID;
  body: string;
  createdAt: string | Date;
  event: string;
  title: string;
  user: CurrentUser;
};

export type ActivityEdge = {
  cursor: string;
  node: Activity;
};

export type ActivityData = {
  activities: {
    edges: ActivityEdge[];
    pageInfo: PageInfo;
  };
};

export type ActivityVariables = {
  events: string[];
  last?: number;
  before?: string;
  first?: number;
  after?: string;
};
