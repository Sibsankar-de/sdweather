import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';

import './css/root.css'
import './css/utils.css'
import './css/home.style.css'
import './css/wpage.style.css'
import './css/searchPage.style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import { SearchPage } from './components/pages/searchPage';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {window.innerWidth <= 834 && <Route path='/search' element={<SearchPage />} />}
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
