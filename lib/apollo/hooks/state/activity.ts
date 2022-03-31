import useActivitiesQuery from 'api/queries/useActivitiesQuery';
import activityEvents from 'config/activityEvents';
import activityPageSizes from 'config/activityPageSizes';

import { Activity } from 'types/activityType';
// import type { ActivityEdge } from 'api/types/user/activity';
import { Activities_activities_edges } from 'graphql/queries/pages/__generated__/Activities';
import { ActivityEvent } from '__generated__/globalTypes';

type ActivityParams = {
  beforeCursor?: string;
  afterCursor?: string;
  filterValue?: ActivityEvent;
  pageSize: number;
};

const getFormattedActivity = (edges: Activities_activities_edges[]): Activity[] => {
  const activities: Activity[] = [];

  edges.forEach(({ node }) => {
    if (!node) return;

    const {
      id,
      title,
      body,
      createdAt,
      event,
      user: { firstName, lastName, email, avatarUrl },
    } = node;

    activities.push({
      id,
      title,
      description: body,
      date: new Date(createdAt).toLocaleString(),
      color: activityEvents.find((e) => e.value === event)?.color,
      name: `${firstName} ${lastName}`,
      email,
      avatarUrl,
    });
  });

  return activities;
};

export const useActivity = ({
  beforeCursor,
  afterCursor,
  filterValue,
  pageSize = activityPageSizes[0],
}: ActivityParams) => {
  const events = filterValue ? [filterValue] : activityEvents.map(({ value }) => value);
  const first = afterCursor || (!afterCursor && !beforeCursor) ? pageSize : undefined;
  const last = beforeCursor ? pageSize : undefined;

  const { loading, error, data } = useActivitiesQuery({
    variables: {
      events,
      last,
      before: beforeCursor,
      first,
      after: afterCursor,
    },
  });

  return {
    activities: data?.activities?.edges
      ? getFormattedActivity(data?.activities.edges as Activities_activities_edges[])
      : null,
    pageInfo: data?.activities?.pageInfo || null,
    loading,
    error,
  };
};
