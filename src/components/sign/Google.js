import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const Google = () => {
  const responseGoogle = async (response) => {
    const { tokenId } = response ? response : null;
    if (tokenId === null) {
      window.alert('Google login failure.');
    }
    const loginResult = await axios({
      withCredentials: true,
      method: 'POST',
      url: REACT_APP_HOST + `/api/1.0/user/signIn`,
      data: {
        provider: 1,
        accessToken: tokenId,
      },
    });
    console.log(`#loginResult#`, loginResult.data.data);
    if (loginResult.data.data) {
      window.location.href = '/rss';
    } else {
      window.alert('Google login failure.');
    }
  };
  return (
    <button className="google">
      <GoogleLogin
        clientId="553380410940-gs0urt46amsc9kts0au06avqgp6u8721.apps.googleusercontent.com"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Continue with Google
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
