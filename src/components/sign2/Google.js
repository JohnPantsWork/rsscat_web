import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const { REACT_APP_HOST, REACT_APP_GOOGLE_OAUTH_END } = process.env;

const Google = () => {
  const responseGoogle = async (response) => {
    console.log(`#response#`, response);
    const { accessToken } = response ? response : null;
    if (accessToken === null) {
      window.alert('Google login failure.');
    }
    const loginResult = await axios({
      withCredentials: true,
      method: 'POST',
      url: REACT_APP_HOST + `/api/1.0/user/signin`,
      data: {
        provider: 1,
        accessToken: accessToken,
      },
    });
    if (loginResult.data.data) {
      window.location.href = '/rsscat';
    } else {
      window.alert('Google login failure.');
    }
  };
  return (
    <button className="google">
      <GoogleLogin
        clientId={`${REACT_APP_GOOGLE_OAUTH_END}`}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Google
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </button>
  );
};

export default Google;
