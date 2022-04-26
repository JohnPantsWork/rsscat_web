import React, { useState, useEffect } from 'react';
import Signup from '../components/sign/Signup';
import Signin from '../components/sign/Signin';
import Facebook from '../components/sign/Facebook';
import Google from '../components/sign/Google';
import icon from '../assets/images/icon.jpg';
import '../styles/sign/sign.css';

const Sign = () => {
  const [signUpClass, setSignUpclass] = useState(null);
  const [signInClass, setSignInclass] = useState(null);
  const [content, setContent] = useState('Signup');
  const [renderContent, setRenderContent] = useState(<Signup />);

  useEffect(() => {
    switch (content) {
      case 'Signup':
        setRenderContent(<Signup />);
        setSignInclass(null);
        setSignUpclass('selected');
        break;
      case 'Signin':
        setRenderContent(<Signin />);
        setSignUpclass(null);
        setSignInclass('selected');
        break;
      default:
        setRenderContent(<Signup />);
        setSignInclass(null);
        setSignUpclass('selected');
        break;
    }
  }, [content]);

  return (
    <div className="sign">
      <h1>RSSCAT</h1>
      <div className="oauth">
        <Facebook />
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
      <div className="signbox">
        <nav>
          <ul>
            <li
              className={signUpClass}
              onClick={() => {
                setContent('Signup');
              }}
            >
              註冊
            </li>
            <li
              className={signInClass}
              onClick={() => {
                setContent('Signin');
              }}
            >
              登入
            </li>
          </ul>
        </nav>
        <div className="signContent">{renderContent}</div>
      </div>
      <img src={icon} alt="website icon" />
    </div>
  );
};

export default Sign;
