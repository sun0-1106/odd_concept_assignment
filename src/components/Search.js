import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767.98px) {
  }
`;
const Input = styled.input`
  width: 70%;
  height: 30px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  border-width: 0;
  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }
  @media screen and (max-width: 767.98px) {
  }
`;
const Button = styled.button`
  width: 70px;
  height: 40px;
  margin-left: 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background: #20b2ed;
  cursor: pointer;
  :hover {
    background: #1d80aa;
  }
`;

const Search = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const onChange = event => {
    setText(event.target.value);
  };

  const submit = () => {
    if (text === '') {
      alert('검색할 키워드를 입력해 주세요.');
    } else {
      //product코드 또는 이미지url 검색
      if (!isNaN(text) || text.includes('https')) {
        navigate(`/regions?keyword=${text}`);
      } else {
        //키워드 검색
        navigate(`/products?keyword=${text}`);
      }
    }
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <>
      <Container>
        <Input
          placeholder='IMAGE URL or KEYWORD'
          value={text}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <Button onClick={submit}>검 색</Button>
      </Container>
    </>
  );
};

export default Search;
