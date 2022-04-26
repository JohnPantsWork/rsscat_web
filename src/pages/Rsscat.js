import React, { useState, useEffect } from 'react';
import Nav from '../components/rsscat/Nav';
import Feedmeow from '../components/rsscat/Feedmeow';
import Rssmanager from '../components/rsscat/Rssmanager';
import News from '../components/rsscat/News';
import Hots from '../components/rsscat/Hots';
import Statistics from '../components/rsscat/Statistics';
import Settings from '../components/rsscat/Settings';
import '../styles/rsscat/rsscat.css';

const Rsscat = () => {
  const [content, setContent] = useState('Feedmeow');
  const [renderContent, setRenderContent] = useState(<Feedmeow />);

  useEffect(() => {
    switch (content) {
      case 'feedmeow':
        setRenderContent(<Feedmeow />);
        break;
      case 'rssmanager':
        setRenderContent(<Rssmanager />);
        break;
      case 'news':
        setRenderContent(<News />);
        break;
      case 'hots':
        setRenderContent(<Hots />);
        break;
      case 'statistics':
        setRenderContent(<Statistics />);
        break;
      case 'settings':
        setRenderContent(<Settings />);
        break;
      default:
        setRenderContent(<Feedmeow />);
        break;
    }
  }, [content]);

  // useEffect(() => {
  //   console.log(renderContent);
  // }, [renderContent]);

  return (
    <div className="rsscat">
      <Nav setContent={setContent} />
      {renderContent}
    </div>
  );
};

export default Rsscat;
