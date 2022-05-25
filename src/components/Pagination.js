import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 50px;
`;

const Button = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 24px;
  color: ${({ num, currentPage }) => (num === currentPage ? 'white' : 'black')};
  background: ${({ num, currentPage }) =>
    num === currentPage ? '#9f6dfa' : null};
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;
  :hover {
    background: #ebebec;
  }
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const group = 5;
  const [number, setNumber] = useState(1); //현재 누르는 페이지

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    // 전체 옷/21
    pageNumbers.push(i); //모든 page들이 push됌
  }
  const plusNumber = () => {
    if (number !== Math.ceil(pageNumbers.length / 5)) {
      //마지막 페이지가 아니라면
      setNumber(number + 1);
    }
  };

  const minusNumber = () => {
    if (number !== 1) {
      setNumber(number - 1);
    }
  };
  return (
    <div>
      <Container>
        <Img onClick={minusNumber} src='image/left-arrow.png' />
        {pageNumbers.map((num, index) =>
          number * group >= index + 1 && number * group - 5 < index + 1 ? ( // 끝 조건 && 처음 조건
            <Button
              key={num}
              num={num}
              currentPage={currentPage}
              onClick={() => paginate(num)}
            >
              {num}
            </Button>
          ) : null,
        )}
        <Img onClick={plusNumber} src='image/right-arrow.png' />
      </Container>
    </div>
  );
};

export default Pagination;
