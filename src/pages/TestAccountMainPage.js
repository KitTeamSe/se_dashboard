import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AccountTableContainer from '../containers/Account/Table/AccountTableContainer';
import AccountDeleteContainer from '../containers/Account/Table/AccountDeleteContainer';
import AccountPaginationContainer from '../containers/Account/Table/AccountPaginationContainer';
import AccountSearchContainer from '../containers/Account/Table/AccountSearchContainer';

const drawerWidth = 0;
const drawerHeight = 0;

const Wrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  overflow-x: hidden;
  flex-grow: 1;
  padding: 0 20px;
  margin: 0 ${drawerWidth}px;
  margin-top: ${drawerHeight}px;
`;

const ButtonWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

const TestPageMain = () => (
  <>
    <Wrapper />
    <ContentWrapper>
      <ButtonWrapper>
        <AccountDeleteContainer />
      </ButtonWrapper>
      <AccountTableContainer />
      <AccountPaginationContainer />
      <AccountSearchContainer />

      <Link to="/">메인으로</Link>
    </ContentWrapper>
  </>
);

export default TestPageMain;
