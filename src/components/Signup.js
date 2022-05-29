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
        console.log(`#submiting#`);
        if (username === null || username === '' || email.length > 30) {
            toastEvent.t12();
            return;
        }

        if (
            email === null ||
            email === '' ||
            email.length > 30 ||
            email.includes('@' && '.') === false ||
            email.indexOf('@') > email.indexOf('.')
        ) {
            toastEvent.t14();
            return;
        }

        if (password === null || password === '') {
            toastEvent.t15();
            return;
        }

        if (password !== passwordAgain) {
            toastEvent.t07();
            return;
        }

        if (reCaptcha === null || reCaptcha === '') {
            toastEvent.t09();
            return;
        }
        console.log(`#fbegin#`);
        try {
            console.log(`#1#`);
            toastEvent.t16();
            console.log(`#2#`);
            await axios({
                withCredentials: true,
                method: 'POST',
                url: REACT_APP_HOST + '/api/1.0/user/signup',
                data: {
                    provider: 0,
                    username: username,
                    email: email,
                    password: password,
                    reCaptcha: reCaptcha,
                },
            });
            console.log(`#3#`);
            localStorage.removeItem('missionData');
            console.log(`#4#`);
            window.location.href = '/rss';
        } catch {
            setTimeout(() => {
                window.location.href = '/sign';
            }, 3000);
            toastEvent.t08();
        }
        console.log(`#final#`);
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