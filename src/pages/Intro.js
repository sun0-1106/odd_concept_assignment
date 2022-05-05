import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;
const LeftContainer = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightContainer = styled.div`
  left: 50%;
  width: 50%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  position: absolute;
  color: white;
  font-size: 36px;
  font-weight: 600;
  z-index: 2;
`;
const LeftImage = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: 1;
  :hover {
    opacity: 1;
  }
`;
const RightImage = styled.img`
  position: absolute;
  left: 50%;
  width: 50%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: 1;
  :hover {
    opacity: 1;
  }
`;

const Intro = () => {
  const navigate = useNavigate();
  const gotoOne = () => {
    navigate('/main1');
  };

  const gotoTwo = () => {
    navigate('/main2');
  };

  return (
    <Container>
      <LeftImage src='image/fashion.jpg' onClick={gotoOne} />
      <RightImage src='image/과제2.jpg' onClick={gotoTwo} />
      <LeftContainer>
        <Text>1번 과제</Text>
      </LeftContainer>
      <RightContainer>
        <Text>2번 과제</Text>
      </RightContainer>
    </Container>
  );
};

export default Intro;
