import { useState, useEffect } from 'react';

let timer = 0;

const MissionTimer = () => {
  const [showTime, setShowTime] = useState('');

  useEffect(() => {
    const rawMissionData = localStorage.getItem('missionData');
    if (rawMissionData === null) {
      return;
    }
    const missionData = JSON.parse(rawMissionData);
    const date = new Date(missionData.date).getTime();
    const ttl = missionData.ttl;
    timer = date + ttl - new Date().getTime();
    setInterval(() => {
      timer = timer - 1000;
      setShowTime(msToTime(timer));
      if (timer < 0) {
        localStorage.removeItem('missionData');
      }
    }, 1000);
  }, []);
  return (
    <div>
      <p>任務倒數</p>
      <p>{showTime}</p>
    </div>
  );
};

function msToTime(s) {
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}

export default MissionTimer;
