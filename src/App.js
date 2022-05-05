import './App.css';
import ProductPage from './pages/ProductPage';
import KeywordPage from './pages/KeywordPage';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Intro from './pages/Intro';
import ImageDragPage from './pages/ImageDragPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/main1' element={<Main />} />
        <Route path='/products' element={<KeywordPage />} />
        <Route path='/regions' element={<ProductPage />} />
        <Route path='/main2' element={<ImageDragPage />} />
      </Routes>
    </div>
  );
}

export default App;
