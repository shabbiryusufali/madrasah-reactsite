import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Homepage from './components/Homepage';
import Blog from './components/Blog';
import Library from './components/Library';
import Information from './components/Information';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogPost from './components/BlogPost';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>

    <div className='h-screen flex flex-col bg-slate-600'>
    <Header />
    <div className='flex-grow bg-slate-600'>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/articles" element={<Blog />} />
      <Route path="/articles/:id" element={<BlogPost />} />
      <Route path="/information" element={<Information />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  </div>
    <Footer />
    </div>
  </React.StrictMode>
);

