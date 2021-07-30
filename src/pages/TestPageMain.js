import React from 'react';
import styled from 'styled-components';

import TestContainer from '../containers/Test/TestContainer';

const Wrapper = styled.div`
  display: flex;
`;

const TestPageMain = () => (
  <Wrapper>
    <TestContainer />
  </Wrapper>
);

export default TestPageMain;
