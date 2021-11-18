import React from 'react';
import { css } from 'styled-components';
import Loader from 'components/shared/atoms/Loader';

export const loaderCustomStyles = () => css`
  z-index: 1;
  font-size: 1rem;
`;

const FormLoader = () => <Loader customStyles={loaderCustomStyles}>loading...</Loader>;

export default FormLoader;
