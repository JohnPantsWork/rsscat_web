import React from 'react';

const Facebook = () => {
  const fbState = async () => {
    await window.FB.getLoginStatus(function (response) {
      console.log(`#response#`, response);
    });
  };
  return (
    <div className="facebook">
      {function checkLoginState() {
        window.FB.getLoginStatus(function (response) {});
      }}
      <button className="facebook" onClick={fbState}>
        Facebook
      </button>
    </div>
  );
};

export default Facebook;
