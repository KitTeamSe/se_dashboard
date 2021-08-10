import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

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
      <ButtonWrapper />
      <Typography>메인입니다</Typography>
      <Typography>
        <Link to="account">회원목록</Link>
      </Typography>
    </ContentWrapper>
  </>
);

export default TestPageMain;
