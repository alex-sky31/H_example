import React from 'react';
import SearchPage from './pages/Search/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import DisplayLocation from './pages/DisplayLocation/DisplayLocation';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path='/display' element={<DisplayLocation/>}/>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
