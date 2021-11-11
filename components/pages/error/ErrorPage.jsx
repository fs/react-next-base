import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HOME } from 'config/routes';

import { TitleWrapper, Description, StyledLink } from './styled';

const ErrorPage = ({ statusCode }) => {
  const is404 = statusCode === 404;
  const router = useRouter();

  const links = (
    <>
      <StyledLink onClick={() => router.back()}>Back to previous page</StyledLink> or{' '}
      <Link passHref href={HOME}>
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
