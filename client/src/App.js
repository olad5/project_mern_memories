import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  // let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          {/* automatically redirect to the posts page */}
          <Route path="/" exact element={<Navigate to="/posts" />} />

          {/* automatically show all the posts */}
          <Route path="/posts" exact element={<Home />} />

          {/* still show the posts when searching for posts */}
          <Route path="/posts/search" exact element={<Home />} />

          {/* show the post details path */}
          <Route path="/posts/:id" element={<PostDetails />} />

          {/* this redirects the user to posts if they try to access /auth while signed in */}
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" replace />} />
        </Routes>
      </Container>
    </BrowserRouter>

  );
};

export default App;
