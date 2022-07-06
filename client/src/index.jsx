import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Homepage from './components/Homepage';
import Blog from './components/articles/Blog';
import Library from './components/Library';
import Information from './components/Information';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogPost from './components/articles/BlogPost';
import InsertPost from './components/articles/InsertPost';
import EditPost from './components/articles/EditPost';
import EditNull from './components/articles/EditNull';
import UserList from './components/database/UserList';
import User from './components/database/User';
import LoggedOut from './components/LoggedOut';

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
      <Route path="/articles/new" element={<InsertPost />} />
      <Route path="/articles/edit/" element={<EditNull />} />
      <Route path="/articles/edit/:id" element={<EditPost />} />
      <Route path="/articles/:id" element={<BlogPost />} />
      <Route path="/information" element={<Information />} />
      <Route path="/signup/:error" element={<SignUp />} />
      <Route path="/signup/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/:error" element={<Login />} />
      <Route path="/logout" element={<LoggedOut />} />
      <Route path="/logout/:error" element={<LoggedOut />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:status" element={<Dashboard />} />
      <Route path="/database" element={<UserList />} />
      <Route path="/database/:id" element={<User />} />
    </Routes>
  </BrowserRouter>
  </div>
    <Footer />
    </div>
  </React.StrictMode>
);

