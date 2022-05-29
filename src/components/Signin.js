import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const { REACT_APP_HOST, REACT_APP_GOOGLE_ReCAPTCHA } = process.env;

const Signin = ({ toastEvent }) => {
    let [email, setEmail] = useState('test01@mail.com');
    let [password, setPassword] = useState('test01');
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
            toastEvent.t18();
            return;
        }
        if (password === null || password === '') {
            toastEvent.t18();
            return;
        }
        if (reCaptcha === null || reCaptcha === '') {
            toastEvent.t09();
            return;
        }
        try {
            toastEvent.t17();
            await axios({
                withCredentials: true,
                method: 'POST',
                url: REACT_APP_HOST + '/api/1.0/user/signin',
                data: {
                    provider: 0,
                    email: email,
                    password: password,
                    reCaptcha: reCaptcha,
                },
            });
            localStorage.removeItem('missionData');
            window.location.href = '/rss';
        } catch {
            setTimeout(() => {
                window.location.href = '/sign';
            }, 3000);
            toastEvent.t05();
        }
    };
    return (
        <div className="signin">
            <p>登入資料留白(保留test01)</p>
            <p>可登入測試帳號喔！</p>
            <br></br>
            <form action="">
                <label>信箱</label>
                <input type="text" onChange={getEmail} placeholder={'test01@mail.com'} />
                <label>密碼</label>
                <input type="password" onChange={getPassword} placeholder={'test01'} />
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
