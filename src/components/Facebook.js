import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const Facebook = () => {
    const responseFacebook = async (response) => {
        const { accessToken } = response ? response : null;
        if (accessToken === null) {
            window.alert('Facebook login failure.');
        }
        const loginResult = await axios({
            withCredentials: true,
            method: 'POST',
            url: REACT_APP_HOST + `/api/1.0/user/signin`,
            data: {
                provider: 2,
                accessToken: accessToken,
            },
        });
        if (loginResult.data.data) {
            localStorage.removeItem('missionData');
            window.location.href = '/rss';
        } else {
            window.alert('Facebook login failure.');
        }
    };
    return (
        <div className="facebook">
            <FacebookLogin
                appId="679271183308830"
                // autoLoad
                callback={responseFacebook}
                render={(renderProps) => (
                    <button onClick={renderProps.onClick}>Continue with Facebook</button>
                )}
                cssClass="facebookBtn"
            />
        </div>
    );
};

export default Facebook;
