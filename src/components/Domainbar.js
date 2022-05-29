import React from 'react';
import Switcher from './Switcher';
import axios from 'axios';

const { REACT_APP_HOST } = process.env;

const Domainbar = ({ rssId, title, setLikedDomains, defaultValue, loginState }) => {
    const submitDomain = async () => {
        setLikedDomains((curr) => curr.concat(rssId));
        await axios({
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
        await axios({
            withCredentials: true,
            method: 'PATCH',
            url: `${REACT_APP_HOST}/api/1.0/user/domain`,
            data: { dislikedDomainId: rssId },
        });
    };

    return (
        <div className="domainbar">
            <p>{title}</p>
            {loginState ? (
                <Switcher
                    onEvent={submitDomain}
                    offevent={unsubmitDomain}
                    defaultValue={defaultValue}
                />
            ) : null}
        </div>
    );
};

export default Domainbar;
