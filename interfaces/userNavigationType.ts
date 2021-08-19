import ITest from 'interfaces/testType';

interface LinkConfig extends ITest {
  text: string;
  url: string;
}

interface ActionsConfig extends ITest {
  text: string;
  onClick: (arg?: { everywhere?: boolean }) => Promise<void>; // TODO: expect any function here
}

export default interface IUserNavigation {
  links?: LinkConfig[];
  actions?: ActionsConfig[];
}
