import styled from 'styled-components';

const Container = styled.div`
  width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  @media (max-width: 500px) {
    width: 100%;
    margin-right: 0px;
  }

  @media (min-width: 500px) and (max-width: 767.98px) {
  }
`;

const Photo = styled.img`
  position: relative;
  max-width: 250px;
  height: 350px;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 8vh;
  border-bottom: 1px solid #ccc;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Text = styled.p`
  position: relative;
  font-weight: bold;
  color: rgb(51, 51, 51);
  font-size: 1.5rem;
  text-align: left;
  padding-left: 12px;
  @media (max-width: 767.98px) {
    font-size: 1.2rem;
  }
`;

const Box = styled.div`
  display: inline-block;
  height: 4vh;
  text-align: center;
  line-height: 4vh;
  background-color: #9f6dfa;
  color: #fff;
  font-weight: 500;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
  margin-left: 20px;
  @media (max-width: 767.98px) {
    margin-left: 10px;
  }
`;
const Items2 = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: 500px) {
    width: 90%;
  }
`;
const Text2 = styled.p`
  position: relative;
  width: 100%;
  text-align: left;
  font-weight: bold;
  color: rgb(51, 51, 51);
  font-size: 1.5rem;
  padding-left: 12px;
  box-sizing: border-box;

  @media (max-width: 500px) {
  }
  @media (max-width: 767.98px) {
    font-size: 1.2rem;
  }
`;

const Box2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: -2vh;
  width: 100%;
  height: 100%;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Tag = styled.div`
  /* display: inline-block; */
  width: 100%;
  float: left;
  text-align: left;
  height: 8vh;
`;

const Value = styled.div`
  color: #9f6dfa;
  font-weight: bold;
  margin-top: 10px;
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;

  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`;

const Key = styled.p`
  color: #0c0c0c;
  width: 100%;
  padding-left: 10px;

  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`;

function Regions({ regionData }) {
  return (
    <Container>
      <Photo src={regionData.image_url}></Photo>
      <Items>
        <Text>ITEMS</Text>
        <Box>{regionData.category_names[0].replace('c1.', '')}</Box>
      </Items>
      <Items2>
        <Text2>ATTRIBUTES</Text2>
      </Items2>

      <Box2>
        {regionData.attributes.map(el => {
          let key = String(Object.keys(el));
          return (
            <Tag key={key}>
              <Value>{('#' + el[Object.keys(el)]).toUpperCase()}</Value>
              <Key>{key.toUpperCase()}</Key>
            </Tag>
          );
        })}
      </Box2>
    </Container>
  );
}
export default Regions;
