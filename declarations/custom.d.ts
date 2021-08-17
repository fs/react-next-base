declare module '*.svg' {
  import React from 'react';

  const component: React.FunctionComponent<React.SVGProps<SVGElement>>;
  const content: string;

  export { component };
  export default content;
}
