type GraphqlErrorType = {
  message: string;
  status?: number;
  code?: string;
  detail?: [] | null;
};

export default GraphqlErrorType;
