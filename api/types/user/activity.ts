import User from 'domain/User';
import { PageInfo } from 'types/activityType';

export type Activity = {
  body: string;
  createdAt: string | Date;
  event: string;
  id: string | number;
  title: string;
  user: User;
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
