import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSignOut } from 'lib/apollo/hooks/actions';
import useNotifier from 'hooks/useNotifier';

const StyledProfileActions = styled.div`
  margin: 0 0 2rem;
`;

const UserInfo = ({ data }) => {
  const me = data?.me;
  const { setInfo } = useNotifier();

  const [signOut] = useSignOut();
  const LogOutFromAllDevices = () => signOut({ everywhere: true });

  useEffect(() => {
    if (me) {
      setInfo(me.firstName);
    }
  }, [me, setInfo]);

  return (
    <>
      <StyledProfileActions>
        <button type="button" onClick={LogOutFromAllDevices}>
          Log out from all devices
        </button>
      </StyledProfileActions>
      <div>{`This is Current User: ${JSON.stringify(me)}`}</div>
    </>
  );
};

export default UserInfo;
