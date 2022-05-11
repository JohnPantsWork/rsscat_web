import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const { REACT_APP_HOST, REACT_APP_GOOGLE_ReCAPTCHA } = process.env;

const Signup = ({ toastEvent }) => {
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [passwordAgain, setPasswordAgain] = useState('');
  let [reCaptcha, setReCaptcha] = useState('');
  const getUsername = (e) => {
    const nameValue = e.target.value;
    setUsername(nameValue);
  };
  const getEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };
  const getPassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };
  const getPasswordAgain = (e) => {
    const passwordAgainValue = e.target.value;
    setPasswordAgain(passwordAgainValue);
  };
  const getReCaptcha = (e) => {
    setReCaptcha(e);
  };
  const userSubmit = async () => {
    if (username === null || username === '') {
      window.alert('請輸入名稱');
      toastEvent.t06();
      return;
    }
    if (email === null || email === '') {
      // window.alert('請輸入信箱');
      toastEvent.t06();
      return;
    }
    if (password === null || password === '') {
      // window.alert('請輸入密碼');
      toastEvent.t06();
      return;
    }
    if (password !== passwordAgain) {
      // window.alert('密碼不一致');
      toastEvent.t07();
      return;
    }
    if (reCaptcha === null || reCaptcha === '') {
      // window.alert('請勾選我不是機器人');
      toastEvent.t09();
      return;
    }

    try {
      const result = await axios({
        withCredentials: true,
        method: 'POST',
        url: REACT_APP_HOST + '/api/1.0/user/signUp',
        data: {
          provider: 0,
          username: username,
          email: email,
          password: password,
          reCaptcha: reCaptcha,
        },
      });
      console.log(`#註冊成功#`);
      localStorage.removeItem('missionData');
      window.location.href = '/rss';
    } catch {
      console.log(`#登入失敗#`);
      toastEvent.t08();
    }
  };
  return (
    <div className="signup">
      <form action="">
        <label>名稱</label>
        <input type="text" onChange={getUsername} />
        <label>信箱</label>
        <input type="text" onChange={getEmail} />
        <label>密碼</label>
        <input type="password" onChange={getPassword} />
        <label>再次輸入密碼</label>
        <input type="password" onChange={getPasswordAgain} />
      </form>
      <ReCAPTCHA sitekey={`${REACT_APP_GOOGLE_ReCAPTCHA}`} onChange={getReCaptcha} />
      <div>
        <button className="signUp" onClick={userSubmit}>
          註冊
        </button>
      </div>
    </div>
  );
};

export default Signup;
