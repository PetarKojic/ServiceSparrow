import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from './pages/AuthFlow/Register/Register';
import Login from './pages/AuthFlow/Login/Login';
import ForgetEmail from './pages/AuthFlow/ForgetPassword/ForgetEmail';
import ForgetPassword from './pages/AuthFlow/ForgetPassword/ForgetPassword';
import Toast from './components/Toastifycom';
import OtpcodeScreen from './pages/AuthFlow/Otpcode/Otpcode';
import Home from './pages/Home/Home';
import OtpScreenEmail from './pages/AuthFlow/ForgetPassword/OtpScreenEmail';
import { Context } from './Context/ContextStates';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import AppliedJobs from './pages/AppliedJobs/Appliedjobs';
import MyJobsMain from './pages/MyJobs/MyjobsMain';

function App() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchRec, setSearchRec] = useState('')
  const [searchTop, setSearchTop] = useState('')




  return (
    <div className="App">
      <Context.Provider value={{ search,setSearch ,searchRec,setSearchRec,searchTop,setSearchTop}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetEmail" element={<ForgetEmail />} />
          <Route path="/verify-account" element={<OtpScreenEmail />} />
          <Route path="/reset-Password/:id" element={<ForgetPassword />} />
          <Route path="/otpcode" element={<OtpcodeScreen />} />
          <Route path="/" element={<Home />} />
          <Route path="/CategoryDetail" element={<CategoryDetail />} />
          <Route path="/AppliedJobs" element={<AppliedJobs />} />

          <Route path="/myjobs" element={<MyJobsMain />} />





        </Routes>
      </Context.Provider>
      <Toast />

    </div>
  );
}

export default App;
