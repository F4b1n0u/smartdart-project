// client/src/components/DPad.js
import React from 'react';
import styled from 'styled-components';

const DPadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  position: relative;
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  background-color: white;
  border: 2px solid black;
  position: absolute;
  font-size: 16px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.up {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &.left {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &.right {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  &.down {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const DPad = ({ onUp, onDown, onLeft, onRight }) => {
  return (
    <DPadContainer>
      <Button className="up" onClick={onUp}>up</Button>
      <Button className="left" onClick={onLeft}>left</Button>
      <Button className="right" onClick={onRight}>right</Button>
      <Button className="down" onClick={onDown}>down</Button>
    </DPadContainer>
  );
};
