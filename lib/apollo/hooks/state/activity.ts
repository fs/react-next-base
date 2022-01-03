import useActivitiesQuery from 'api/queries/useActivitiesQuery';
import activityEvents from 'config/activityEvents';
import activityPageSizes from 'config/activityPageSizes';

import { Activity } from 'types/activityType';
import type { ActivityEdge } from 'api/types/user/activity';

type ActivityParams = {
  beforeCursor?: string;
  afterCursor?: string;
  filterValue?: string;
  pageSize: number;
};

const getFormattedActivity = (edges: ActivityEdge[]): Activity[] => {
  return edges.map(
    ({
      node: {
        id,
        title,
        body,
        createdAt,
        event,
        user: { firstName, lastName, email, avatarUrl },
      },
    }) => ({
      id,
      title,
      description: body,
      date: new Date(createdAt).toLocaleString(),
      color: activityEvents.find((e) => e.value === event)?.color,
      name: `${firstName} ${lastName}`,
      email,
      avatarUrl,
    }),
  );
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
    activities: data?.activities?.edges ? getFormattedActivity(data?.activities.edges) : null,
    pageInfo: data?.activities?.pageInfo || null,
    loading,
    error,
  };
};
