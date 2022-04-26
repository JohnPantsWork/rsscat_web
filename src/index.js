import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

initFacebookSdk().then(
  ReactDOM.render(
    // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    // </StrictMode>,
    document.querySelector('#root')
  )
);

function initFacebookSdk() {
  return new Promise((resolve) => {
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 679271183308830,
        cookie: true,
        xfbml: true,
        version: 'v13.0',
      });

      // auto authenticate with the api if already logged in with facebook
      window.FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          console.log(`#already login#`);
        } else {
          resolve();
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/zh_TW/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}
