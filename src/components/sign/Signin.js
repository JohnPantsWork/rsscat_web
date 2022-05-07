import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const { REACT_APP_HOST, REACT_APP_GOOGLE_ReCAPTCHA } = process.env;

const Signin = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [reCaptcha, setReCaptcha] = useState('');
  const getEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };
  const getPassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };
  const getReCaptcha = (e) => {
    setReCaptcha(e);
  };
  const userLogin = async () => {
    if (email === null || email === '') {
      window.alert('請輸入信箱');
      return;
    }
    if (password === null || password === '') {
      window.alert('請輸入密碼');
      return;
    }
    if (reCaptcha === null || reCaptcha === '') {
      window.alert('請勾選我不是機器人');
      return;
    }
    const result = await axios({
      withCredentials: true,
      method: 'POST',
      url: REACT_APP_HOST + '/api/1.0/user/signIn',
      data: {
        provider: 0,
        email: email,
        password: password,
        reCaptcha: reCaptcha,
      },
    });
    const { status } = result.data.data;
    console.log(`#--------------------[status]#\n`, status);
    switch (status) {
      case 2000:
        console.log(`#登入成功#`);
        window.location.href = '/rss';
        break;
      default:
        console.log(`#登入失敗#`);
        break;
    }
  };
  return (
    <div className="signin">
      <form action="">
        <label>帳號</label>
        <input type="text" onChange={getEmail} />
        <label>密碼</label>
        <input type="password" onChange={getPassword} />
      </form>
      <ReCAPTCHA sitekey={`${REACT_APP_GOOGLE_ReCAPTCHA}`} onChange={getReCaptcha} />
      <div>
        <button className="signInBtn" onClick={userLogin}>
          登入
        </button>
      </div>
    </div>
  );
};

export default Signin;
