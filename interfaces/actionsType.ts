export default interface ISignOut {
  (arg?: { everywhere?: boolean | undefined } | undefined): Promise<void>;
}
