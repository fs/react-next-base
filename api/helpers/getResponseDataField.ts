const getResponseDataField = <TResponseData>(fieldName: keyof TResponseData, responseData?: TResponseData | null) =>
  responseData?.[fieldName];

export default getResponseDataField;
