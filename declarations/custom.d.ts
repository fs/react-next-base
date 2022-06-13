declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react';

  const component: FunctionComponent<SVGProps<SVGElement>>;
  const content: string;

  export { component };
  export default content;
}
