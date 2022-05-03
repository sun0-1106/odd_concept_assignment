import styled from 'styled-components';

const Container = styled.div`
  width: 210px;
  height: 370px;
  border: 1px solid #ccc;
  box-shadow: 4px 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-right: 20px;
  margin-bottom: 20px;
  overflow: hidden;

  @media (max-width: 767.98px) {
    margin: 10px;
    width: 135px;
    height: 237px;
  }
`;
const PhotoContainer = styled.div`
  width: 100%;
  height: 75%;
  cursor: pointer;
  overflow: hidden;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;

  :hover {
    transform: scale(1.05);
    transition: 0.3s;
  }
`;
const Info = styled.div`
  position: relative;
  width: 100%;
  height: 8vh;
`;
const Name = styled.p`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding-left: 5%;
  top: -10%;
  text-align: left;
  font-weight: bold;
  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`;
const Price = styled.div`
  position: relative;
  top: -5%;
  box-sizing: border-box;
  width: 100%;
  padding-right: 5%;
  text-align: right;
  color: #9f6dfa;
  font-weight: bold;
  @media (max-width: 767.98px) {
    font-size: 14px;
    top: -20%;
  }
`;

function Clothes({ data }) {
  return (
    <div>
      <Container>
        <PhotoContainer>
          <a href={data.image_url}>
            <Photo src={data.image_url}></Photo>
          </a>
        </PhotoContainer>
        <Info>
          <Name>{data.name}</Name>
          <Price>{'￦' + data.price}</Price>
        </Info>
      </Container>
    </div>
  );
}

export default Clothes;
