import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display; flex;
  flex: 1 1 auto;
  width: 100%;
  background-color: blue;
`

export const Preview = () => {
  return (
    <Background>
      <span>Game B - first to 200</span>
    </Background>
  )
}