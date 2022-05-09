import React from 'react';
import Switcher from './Switcher';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const Domainbar = ({ rssId, title, setLikedDomains, defaultValue }) => {
  const submitDomain = async () => {
    setLikedDomains((curr) => curr.concat(rssId));
    const result = await axios({
      withCredentials: true,
      method: 'PATCH',
      url: `${REACT_APP_HOST}/api/1.0/user/domain`,
      data: { likedDomainId: rssId },
    });
  };

  const unsubmitDomain = async () => {
    setLikedDomains((curr) =>
      curr.filter((domain) => {
        if (domain !== rssId) {
          return domain;
        }
      })
    );
    const result = await axios({
      withCredentials: true,
      method: 'DELETE',
      url: `${REACT_APP_HOST}/api/1.0/user/domain`,
      data: { dislikedDomainId: rssId },
    });
  };

  return (
    <div className="domainbar">
      <p>{title}</p>
      <Switcher onEvent={submitDomain} offevent={unsubmitDomain} defaultValue={defaultValue} />
    </div>
  );
};

export default Domainbar;
