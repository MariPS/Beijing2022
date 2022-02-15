import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';


function App(){
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);