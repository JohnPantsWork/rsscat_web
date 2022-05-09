import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
export const missionContext = createContext(null);

const missionInit = async () => {
  try {
    const rawMissionResult = await axios({
      withCredentials: true,
      url: REACT_APP_HOST + `/api/1.0/cat/mission`,
    });
    const missionResult = rawMissionResult.data.data;
    const hasMission = localStorage.getItem('missionData');
    if (hasMission !== null && !missionResult.renew) {
      return;
    }
    const missions = missionResult.missionList.map((mission) => {
      mission['prograss'] = 0;
      return mission;
    });
    localStorage.setItem(
      'missionData',
      JSON.stringify({ date: new Date(), ttl: missionResult.ttl, finishedCounts: 0, missionCounts: missions.length, missions: missions })
    );
  } catch (err) {
    console.log(`#err#`, err);
  }
};
missionInit();

const App = () => {
  const [loginState, setLoginState] = useState(false);
  const [toggleFooter, setToggleFooter] = useState(false);
  const [tags, setTags] = useState([]);

  const toastEvent = {
    t01: (level) => toast.success(`已移除關聯度低於${level}的標籤`),
    t02: () => toast.success('已訂閱所有來源'),
    t03: () => toast.success('已取消所有來源'),
    t04: (mission) => toast.success(`任務「${mission}」已完成`),
  };

  const getTags = async () => {
    const result = await axios({
      withCredentials: true,
      method: 'GET',
      url: REACT_APP_HOST + `/api/1.0/user/tag`,
    });
    const realTags = result.data.data.likeTags;
    const tagNames = realTags.map((e) => {
      return e.tag_name;
    });
    setTags(tagNames);
    setLoginState(true);
  };

  const missionEvent = async (target, behavior) => {
    const missionData = JSON.parse(localStorage.getItem('missionData'));
    // mission all finished.
    if (missionData.finishedCounts >= missionData.missionCounts) {
      return;
    }

    const m = missionData.missions;
    for (let i = 0; i < m.length; i += 1) {
      if (m[i].mission_target_id === target && m[i].mission_behavior_id === behavior) {
        if (m[i].prograss <= m[i].volume) {
          m[i].prograss += 1;
        }

        if (m[i].prograss > m[i].volume) {
          break;
        } else if (m[i].prograss === m[i].volume) {
          missionData.finishedCounts += 1;
          await axios({
            withCredentials: true,
            method: 'PATCH',
            url: REACT_APP_HOST + `/api/1.0/cat/mission`,
            data: { completed: m[i].id },
          });
          break;
        }
      }
    }
    missionData.missions = m;
    localStorage.setItem('missionData', JSON.stringify(missionData));
  };

  return (
    <>
      <missionContext.Provider value={{ missionEvent }}>
        <Header loginState={loginState} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home setToggleFooter={setToggleFooter} />} />
          <Route path="/sign" element={<Sign setToggleFooter={setToggleFooter} />} />
          <Route path="/rss" element={<Rss setToggleFooter={setToggleFooter} tags={tags} getTags={getTags} />} />
          <Route path="/manager" element={<Manager setToggleFooter={setToggleFooter} toastEvent={toastEvent} />} />
          <Route path="/news" element={<News setToggleFooter={setToggleFooter} />} />
          <Route path="/tags" element={<Tags setToggleFooter={setToggleFooter} toastEvent={toastEvent} />} />
          <Route path="/cat" element={<Cat setToggleFooter={setToggleFooter} toastEvent={toastEvent} />} />
        </Routes>
        {toggleFooter ? <Footer /> : null}
      </missionContext.Provider>
    </>
  );
};

export default App;
