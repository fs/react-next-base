import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HOME } from 'config/routes';
import { ErrorPageContext } from 'types/pageContextInterfaces';

import { TitleWrapper, Description, StyledLink } from './styled';

interface Props {
  statusCode: number;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
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

ErrorPage.getInitialProps = ({ res, err, statusCode }: ErrorPageContext) => {
  return {
    statusCode: statusCode || res?.statusCode || err?.statusCode || 404,
  };
};

export default ErrorPage;
