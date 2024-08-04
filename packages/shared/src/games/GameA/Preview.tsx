import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display; flex;
  flex: 1 1 auto;
  width: 100%;
  background-color: red;
`

export const Preview = () => {
  return (
    <Background>
      <span> Game A Preview</span>
    </Background>
  )
}