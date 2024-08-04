import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display; flex;
  flex: 1 1 auto;
  width: 100%;
  background-color: green;
`

export const Preview = () => {
  return (
    <Background>
      <span> Game C Preview</span>
    </Background>
  )
}