import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import ClothesBox from '../components/ClothesBox';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/clothes/productsSlice';
import Loading from '../components/Loading';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function KeywordPage() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { keyword } = queryString.parse(search);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 21; //페이지당 포스트 개수
  //현재 페이지 가져오기
  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const [currentPosts, setCurrentPosts] = useState(posts);
  //클릭 이벤트 페이지 바꾸기
  const paginate = pageNum => setCurrentPage(pageNum);

  const products = useSelector(state => state.products);

  useEffect(() => {
    !products.data && dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (!products.isLoading) {
      setPosts(products.data.filter(item => item.name.includes(keyword)));
    }
  }, [keyword, products]);

  useEffect(() => {
    if (posts) {
      setCurrentPosts(posts.slice(indexOfFirstPage, indexOfLastPage));
    }
  }, [posts, currentPage]);

  return (
    <Container>
      <Header />
      {products.isLoading ? (
        <Loading />
      ) : (
        <>
          <ClothesBox posts={currentPosts} />
          {currentPosts?.length > 0 && (
            <Pagination
              postPerPage={postPerPage}
              totalPosts={posts?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </Container>
  );
}
export default KeywordPage;
