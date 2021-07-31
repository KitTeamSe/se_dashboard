import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
      <h1>메인입니다</h1>
      <Link to="account">회원목록</Link>
    </ContentWrapper>
  </>
);

export default TestPageMain;
