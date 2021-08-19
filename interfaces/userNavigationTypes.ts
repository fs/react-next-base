import ITest from 'interfaces/testType';

interface LinkConfig extends ITest {
  text: string;
  url: string;
}

interface ActionsConfig extends ITest {
  text: string;
  onClick: () => void;
}

export default interface IUserNavigation {
  links?: LinkConfig[];
  actions?: ActionsConfig[];
}
