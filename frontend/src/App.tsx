import React from 'react';
import SearchPage from './pages/Search/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import DisplayLocation from './pages/DisplayLocation/DisplayLocation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<SearchPage />} />
            <Route path="/display/:id" element={<DisplayLocation />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
