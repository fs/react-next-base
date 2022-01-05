export type PresignFile = {
  fields: {
    key: string;
    value: string;
  }[];
  url: string;
};

export type PresignFileData = {
  data: PresignFile;
};

export type PresignFileVariables = {
  type: string;
  filename: string;
};
