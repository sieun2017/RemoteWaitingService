import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/material';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage/LoginPage'
import JoinPage from './pages/JoinPage/JoinPage'
import TermsPage from './pages/JoinPage/TermsPage'
import TestPage from './pages/TestPage/TestPage';
import EventListPage from './pages/EventListPage/EventListPage';
import EventEditPage from './pages/EventEditPage/EventEditPage';
import MyPage from './pages/MyPage/MyPage';
import MyPageEditPage from './pages/MyPage/MyPageEditPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/events" element={<EventListPage />} />
              <Route path="/event/edit/:id" element={<EventEditPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/edit" element={<MyPageEditPage />} />
              <Route path="/test" element={<TestPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
