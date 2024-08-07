import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display; flex;
  flex: 1 1 auto;
  width: 100%;
  background-color: purple;
`

export const Preview = () => {
  return (
    <Background>
      <span>Killer</span>
    </Background>
  )
}