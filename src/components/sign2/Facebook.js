import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
const { REACT_APP_HOST, REACT_APP_FACEBOOK_APPID } = process.env;

const Facebook = () => {
  const responseFacebook = async (response) => {
    console.log(`#response#`, response);
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
      window.location.href = '/rss';
    } else {
      window.alert('Facebook login failure.');
    }
  };
  return (
    <div className="facebook">
      <FacebookLogin
        appId={`${REACT_APP_FACEBOOK_APPID}`}
        autoLoad
        callback={responseFacebook}
        render={(renderProps) => <button onClick={renderProps.onClick}>Facebook</button>}
        cssClass="facebookBtn"
      />
    </div>
  );
};

export default Facebook;
