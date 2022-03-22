/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ActivityEvent } from './../../../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: Activities
// ====================================================

export interface Activities_me {
  __typename: 'CurrentUser';
  avatarUrl: string | null;
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface Activities_activities_edges_node_user {
  __typename: 'User';
  avatarUrl: string | null;
  email: string;
  firstName: string | null;
  id: string;
  lastName: string | null;
}

export interface Activities_activities_edges_node {
  __typename: 'Activity';
  body: string;
  createdAt: any;
  event: ActivityEvent;
  id: string;
  title: string;
  user: Activities_activities_edges_node_user;
}

export interface Activities_activities_edges {
  __typename: 'ActivityEdge';
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: Activities_activities_edges_node | null;
}

export interface Activities_activities_pageInfo {
  __typename: 'PageInfo';
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface Activities_activities {
  __typename: 'ActivityConnection';
  /**
   * A list of edges.
   */
  edges: (Activities_activities_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: Activities_activities_pageInfo;
}

export interface Activities {
  me: Activities_me | null;
  activities: Activities_activities | null;
}

export interface ActivitiesVariables {
  events?: ActivityEvent[] | null;
  last?: number | null;
  before?: string | null;
  first?: number | null;
  after?: string | null;
}
