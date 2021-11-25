import Test from 'types/testType';

export type LinkConfig = Test & {
  text: string;
  url: string;
};

export type ActionsConfig = Test & {
  text: string;
  onClick: (arg?: { everywhere?: boolean }) => Promise<void>; // TODO: expect any function here
};

type UserNavigation = {
  links?: LinkConfig[];
  actions?: ActionsConfig[];
};

export default UserNavigation;
