import React, { useState, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sign from './pages/Sign2';
import Rss from './pages/Rss';
import News from './pages/News';
import Manager from './pages/Manager';
import Tags from './pages/Tags';
import Cat from './pages/Cat';

import './styles/app.css';
const { REACT_APP_HOST } = process.env;

export const userData = createContext({
  user_missions: [],
  user_tags: [],
  user_cats: { skins: [], currentColor: [] },
});

const App = () => {
  const [toggleFooter, setToggleFooter] = useState(false);
  const { user_missions, user_tags, user_cats } = useContext(userData);
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/tag`,
    });
    const realTags = result.data.data.likeTags;
    const tagNames = realTags.map((e) => {
      return e.tag_name;
    });
    setTags(tagNames);
  };

  return (
    <>
      <userData.Provider>
        <Header />
        <Routes>
          <Route path="/" element={<Home setToggleFooter={setToggleFooter} />} />
          <Route path="/sign" element={<Sign setToggleFooter={setToggleFooter} />} />
          <Route path="/rss" element={<Rss setToggleFooter={setToggleFooter} />} />
          <Route path="/manager" element={<Manager setToggleFooter={setToggleFooter} />} />
          <Route path="/news" element={<News setToggleFooter={setToggleFooter} />} />
          <Route path="/tags" element={<Tags setToggleFooter={setToggleFooter} />} />
          <Route path="/cat" element={<Cat setToggleFooter={setToggleFooter} />} />
        </Routes>
        {toggleFooter ? <Footer /> : null}
      </userData.Provider>
    </>
  );
};

export default App;

////////demo

// import { createContext, useContext, useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { API_HOST, BROKER } from './Constants';

// const StatusContext = createContext({
//   socket: null,
//   setSocket: () => {},
// });

// const StatusProvider = (props) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const socket = io(API_HOST);
//     // const socket = io(API_HOST);

//     setSocket(socket);
//   }, []);
//   useEffect(() => {
//     console.log(socket);
//     if (socket) {
//       console.log('My brokerID is ', BROKER);
//       socket.emit('brokerID', BROKER);
//     }
//   }, [socket]);
//   return (
//     <StatusContext.Provider
//       value={{
//         socket,
//         setSocket,
//       }}
//       {...props}
//     />
//   );
// };

// function useStatus() {
//   return useContext(StatusContext);
// }

// export { StatusProvider, useStatus };
