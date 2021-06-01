import React from 'react';
import { Link } from 'routes';
import styled from 'styled-components';
import Router from 'next/router';

const TitleWrapper = styled.section`
  max-width: 78.75rem;
  padding: 3.75rem 1.25rem 1.875rem;
  margin: 0 auto;
  text-align: center;
`;

const Description = styled.p`
  font-size: 0.9rem;
`;

const StyledLink = styled.a`
  text-decoration: underline;
`;

const ErrorPage = ({ statusCode }) => {
  const is404 = statusCode === 404;

  const links = (
    <>
      <StyledLink onClick={() => Router.back()}>Back to previous page</StyledLink> or{' '}
      <Link passHref route="/contact">
        <StyledLink>contact us</StyledLink>
      </Link>{' '}
      for help.
    </>
  );

  let title = 'Something went wrong.';
  let description = links;

  if (is404) {
    title = "The page you're looking for can't be found.";
    description = <>You didn&apos;t do anything wrong, we may have moved the page. {links}</>;
  }

  return (
    <TitleWrapper data-testid="error-page-text">
      <h1>{title}</h1>
      <Description>{description}</Description>
    </TitleWrapper>
  );
};

const getStatusCode = (res, err) => {
  if (res) {
    return res.statusCode;
  }

  return err ? err.statusCode : 404;
};

ErrorPage.getInitialProps = ({ res, err, statusCode }) => {
  return {
    statusCode: statusCode || getStatusCode(res, err),
  };
};

export default ErrorPage;
