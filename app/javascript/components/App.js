import React, {Component} from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Editor from './Editor';
import './App.css';


const App = () => (
  <>
    <Routes>
      <Route path="pokemon/*" element={<Editor />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;
