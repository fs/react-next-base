import React from 'react';
import styled from 'styled-components';
import { withApolloClient } from 'lib/withApolloClient';
import useProfileData from './useProfileData';
import DefaultTemplate from 'components/templates/DefaultTemplate';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Login = () => {
  //const { data, error, loading } = useProfileData();

  //console.log(data, error, loading)
  return (
    <DefaultTemplate>
      <Title>login</Title>
    </DefaultTemplate>
  );
};

export default withApolloClient(Login);
