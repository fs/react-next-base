import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from 'components/templates/DefaultTemplate';

import { checkList } from '../utils/support';
import * as syntaxList from '../utils/support/syntax';
import * as polyfillsList from '../utils/support/polyfills';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Home = () => {
  const syntaxSupportList = checkList(Object.values(syntaxList));

  return (
    <DefaultTemplate>
      <Title>Welcome to React Next Base</Title>
      <div>
        <strong>Syntax Support:</strong>
        <ul>
          {syntaxSupportList.map(result => (
            <li>{result}</li>
          ))}
        </ul>
      </div>
    </DefaultTemplate>
  );
};

export default Home;
