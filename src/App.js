import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';

import Sign from './pages/Sign2';
import Rss from './pages/Rss';
import News from './pages/News';
import Manager from './pages/Manager';
import Tags from './pages/Tags';
import Cat from './pages/Cat';

import './styles/app.css';
const { REACT_APP_HOST } = process.env;
export const missionContext = createContext(null);

const userSignInCheck = async () => {
    try {
        await axios({
            withCredentials: true,
            method: 'GET',
            url: REACT_APP_HOST + `/api/1.0/user/check`,
        });
        return true;
    } catch (err) {
        return false;
    }
};

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
            JSON.stringify({
                date: new Date(),
                ttl: missionResult.ttl,
                finishedCounts: 0,
                missionCounts: missions.length,
                missions: missions,
            })
        );
    } catch (err) {}
};

const App = () => {
    const [loginState, setLoginState] = useState(false);
    // const [toggleFooter, setToggleFooter] = useState(false);
    const [tags, setTags] = useState([]);

    const toastEvent = {
        t01: (level) => toast.success(`已移除關聯度0的標籤`),
        t02: () => toast.success('已訂閱所有來源'),
        t03: () => toast.success('已取消所有來源'),
        t04: (mission) => toast.success(`任務「${mission}」已完成`),
        t05: () => toast.error(`帳號密碼錯誤，刷新頁面後重新登入`),
        t06: () => toast.error(`註冊資料不完整，請確實填寫`),
        t07: () => toast.error(`兩次密碼不一致`),
        t08: () => toast.error(`信箱已被註冊`),
        t09: () => toast.error(`請勾選機器人驗證`),
        t10: () => toast.error(`沒有足夠的金額`),
        t11: () => toast.info(`登入後才能與貓咪互動喔！`),
        t12: () => toast.info(`請先登入`),
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
    };

    useEffect(() => {
        (async () => {
            const loginState = await userSignInCheck();
            if (loginState) {
                console.log(`#loginState#`, loginState);
                missionInit();
            }
            setLoginState(loginState);
        })();
    }, []);

    const missionEvent = async (target, behavior) => {
        const missionData = JSON.parse(localStorage.getItem('missionData'));
        // mission all finished or data is null.
        if (missionData === null || missionData.finishedCounts >= missionData.missionCounts) {
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
                    toastEvent.t04(m[i].title);
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
                    <Route
                        path="*"
                        element={
                            <Rss
                                loginState={loginState}
                                toastEvent={toastEvent}
                                tags={tags}
                                getTags={getTags}
                            />
                        }
                    />
                    <Route
                        path="/sign"
                        element={<Sign loginState={loginState} toastEvent={toastEvent} />}
                    />
                    <Route
                        path="/rss"
                        element={
                            <Rss
                                loginState={loginState}
                                toastEvent={toastEvent}
                                tags={tags}
                                getTags={getTags}
                            />
                        }
                    />
                    <Route
                        path="/manager"
                        element={<Manager loginState={loginState} toastEvent={toastEvent} />}
                    />
                    <Route
                        path="/news"
                        element={
                            <News
                                loginState={loginState}
                                toastEvent={toastEvent}
                                tags={tags}
                                getTags={getTags}
                            />
                        }
                    />
                    <Route
                        path="/tags"
                        element={<Tags loginState={loginState} toastEvent={toastEvent} />}
                    />
                    <Route
                        path="/cat"
                        element={<Cat loginState={loginState} toastEvent={toastEvent} />}
                    />
                </Routes>
            </missionContext.Provider>
        </>
    );
};

export default App;
