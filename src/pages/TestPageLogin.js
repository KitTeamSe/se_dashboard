import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const TestPageLogin = () => (
  <Wrapper>
    로그인페이지입니다. 로컬스토리지에 key=token value=... 넣으십셔
  </Wrapper>
);

export default TestPageLogin;
