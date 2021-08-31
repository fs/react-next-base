export interface ISignOut {
  (arg?: { everywhere?: boolean | undefined } | undefined): Promise<void>;
}

export interface IPresignFile {
  (arg?: { type: string; name: string }): { fields: []; url: string };
}
