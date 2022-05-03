import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Search from '../components/Search';

const Header = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  width: 200px;
  height: 50px;
  object-fit: contain;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100px;
    margin-left: 10px;
  }
`;
const Container = styled.section`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 3rem;
  color: #4a4a4b;
  line-height: 1.5;
  margin-bottom: 100px;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;
const Bold = styled.span`
  font-weight: bolder;
`;
const SubContainer = styled.section`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Main = () => {
  const navigate = useNavigate();
  const gotoMain = () => {
    navigate('/main1');
  };

  return (
    <>
      <Header>
        <Logo src='image/logo.png' onClick={gotoMain} />
      </Header>
      <Container>
        <Title>
          <Bold>Artificial Intelligence</Bold>
          <br />
          PXL <Bold>Fashion</Bold> Viewer
        </Title>
        <SubContainer>
          <Search />
        </SubContainer>
      </Container>
    </>
  );
};

export default Main;
