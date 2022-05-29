import React, { useState, useEffect } from 'react';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import Facebook from '../components/Facebook';
import Google from '../components/Google';

const Sign = ({ toastEvent, loginState }) => {
    const [signUpClass, setSignUpclass] = useState(null);
    const [signInClass, setSignInclass] = useState(null);
    const [content, setContent] = useState('Signin');
    const [renderContent, setRenderContent] = useState(<Signin />);

    useEffect(() => {
        switch (content) {
            case 'Signin':
                setRenderContent(<Signin toastEvent={toastEvent} />);
                setSignUpclass(null);
                setSignInclass('selected');
                break;
            default:
                setRenderContent(<Signup toastEvent={toastEvent} />);
                setSignInclass(null);
                setSignUpclass('selected');
                break;
        }
    }, [content, toastEvent]);

    useEffect(() => {
        if (loginState) {
            window.location.href = '/';
            return;
        }
    }, [loginState]);

    return (
        <div className="signPage">
            <h1>RSSCAT</h1>
            <h3>Feed Your Information Hunger Within One Website</h3>
            <div className="oauth">
                <Facebook />
                <Google />
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
        </div>
    );
};

export default Sign;
