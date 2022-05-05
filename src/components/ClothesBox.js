import React from 'react';
import styled from 'styled-components';
import Clothes from '../components/Clothes';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
`;

const ClothesBox = ({ posts }) => {
  return (
    <Container>
      {posts?.length > 0 ? (
        posts.map(item => {
          return <Clothes data={item} key={item.product_code} />;
        })
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </Container>
  );
};

export default ClothesBox;
