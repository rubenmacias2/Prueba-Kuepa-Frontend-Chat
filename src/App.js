import './App.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFount from './pages/NotFount/NotFount';
import StreamCourse from './pages/StreamCourse/StreamCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register" element= {<Register/>} />
        <Route path="/home" element={<NotFount component={<Home /> }/>}/>
         <Route path="/streamCourse" element={<NotFount component={<StreamCourse /> }/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
