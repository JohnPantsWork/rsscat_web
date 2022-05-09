import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { missionContext } from '../../pages/Rsscat';

import catShock from '../../assets/images/cat01-brown.png';
import catHug from '../../assets/images/cat02-brown.png';
import catSad from '../../assets/images/cat03-brown.png';
import catAngry from '../../assets/images/cat04-brown.png';
import catExcited from '../../assets/images/cat05-brown.png';
import catPlaying from '../../assets/images/cat06-brown.png';
import catCurious from '../../assets/images/cat07-brown.png';
import catSleep from '../../assets/images/cat08-brown.png';
import catHappy from '../../assets/images/cat09-brown.png';
import catWaiting from '../../assets/images/cat10-brown.png';
const { REACT_APP_HOST } = process.env;

const A_DAY_LONG = 24 * 60 * 60 * 1000;
const CAT_ANGRY_DAYS = 3;
const CAT_GHOST_DAYS = 7;

let kitty;
const Cat = () => {
  const [catMove, setCatMove] = useState('');
  const [catSrc, setCatSrc] = useState(catWaiting);
  const [catStyle, setCatStyle] = useState({});
  // const { missionEvent } = useContext(missionContext);

  const catController = {
    style: {
      ghost: () => {
        setCatStyle({ filter: 'opacity(75%) invert(75%)' });
      },
      original: () => {
        setCatStyle({ filter: 'hue-rotate(0deg)' });
      },
      lemon: () => {
        setCatStyle({ filter: 'hue-rotate(45deg) contrast(200%)' });
      },
      green: () => {
        setCatStyle({ filter: 'hue-rotate(90deg)' });
      },
      cyan: () => {
        setCatStyle({ filter: 'hue-rotate(135deg)' });
      },
      blue: () => {
        setCatStyle({ filter: 'hue-rotate(180deg)' });
      },
      indigo: () => {
        setCatStyle({ filter: 'hue-rotate(225deg)' });
      },
      violet: () => {
        setCatStyle({ filter: 'hue-rotate(270deg)' });
      },
      pink: () => {
        setCatStyle({ filter: 'hue-rotate(315deg) saturate(300%)' });
      },
      orange: () => {
        setCatStyle({ filter: 'contrast(160%) saturate(200%)' });
      },
      gray: () => {
        setCatStyle({ filter: 'grayscale(100%)' });
      },
      pencil: () => {
        setCatStyle({ filter: 'grayscale(100%) contrast(300%)' });
      },
    },
    action: {
      default: () => {
        setCatMove('ld ld-breath');
        setCatSrc(catWaiting);
      },
      shock: () => {
        setCatMove('ld ld-tremble');
        setCatSrc(catShock);
      },
      superShock: () => {
        setCatMove('ld ld-rush-btt');
        setCatSrc(catShock);
      },
      curious: () => {
        setCatMove('ld ld-swim');
        setCatSrc(catCurious);
      },
      superCurious: () => {
        setCatMove('ld ld-jelly-alt');
        setCatSrc(catCurious);
      },
      happy: () => {
        setCatMove('ld ld-skew');
        setCatSrc(catHappy);
      },
      superHappy: () => {
        setCatMove('ld ld-shiver');
        setCatSrc(catHappy);
      },
      play: () => {
        setCatMove('ld ld-jump');
        setCatSrc(catPlaying);
      },
      superPlay: () => {
        setCatMove('ld ld-flip');
        setCatSrc(catPlaying);
      },
      sad: () => {
        setCatMove('ld ld-swim');
        setCatSrc(catSad);
      },
      superSad: () => {
        setCatMove('ld ld-clock');
        setCatSrc(catSad);
      },
      hug: () => {
        setCatMove('ld ld-tick');
        setCatSrc(catHug);
      },
      superHug: () => {
        setCatMove('ld ld-squeeze');
        setCatSrc(catHug);
      },
      angry: () => {
        setCatMove('ld ld-damage');
        setCatSrc(catAngry);
      },
      superAngry: () => {
        setCatMove('ld ld-surprise');
        setCatSrc(catAngry);
      },
      sleep: () => {
        setCatMove('ld ld-breath');
        setCatSrc(catSleep);
      },
      excited: () => {
        setCatMove('ld ld-swim');
        setCatSrc(catExcited);
      },
      superExcited: () => {
        setCatMove('ld ld-bounce');
        setCatSrc(catExcited);
      },
      crazy: () => {
        setCatMove('ld ld-spin-fast');
        setCatSrc(catExcited);
      },
    },
  };

  class catStateMachine {
    stateFrequence = 1;
    currentState = 'default';
    overrideStyle = false;
    nextState = '';
    ignoreTimer = 0;
    recentClicked = 0;
    date = {};

    constructor(state = 'default', stateFrequence = 1, overrideStyle = false) {
      this.currentState = state;
      this.stateFrequence = stateFrequence;
      this.overrideStyle = overrideStyle;
      this.default();
    }

    async default() {
      const catStateResult = await axios({
        withCredentials: true,
        method: 'GET',
        url: REACT_APP_HOST + `/api/1.0/cat`,
      });

      this.data = catStateResult.data.data;
      this.data.latest_login = new Date(JSON.parse(this.data.latest_login));

      // not login for too long.
      const days = (new Date() - this.data.latest_login) / A_DAY_LONG;

      // set last style
      if (this.overrideStyle) {
        catController.style[this.overrideStyle]();
      } else if (days > CAT_GHOST_DAYS) {
        this.overrideStyle = 'ghost';
        catController.style[this.overrideStyle]();
      } else {
        catController.style[this.data.latest_style]();
      }

      if (days > CAT_ANGRY_DAYS) {
        await this.angry();
      } else {
        await this.hug();
      }

      // set kitty alive!
      await setInterval(this.heartBeat.bind(this), 1000);

      return;
    }

    async heartBeat() {
      this.ignoreTimer += 1;
      this.recentClicked = 0;
      if (this.nextState !== '') {
        this[this.nextState]();
      }
    }

    async getClick() {
      this.ignoreTimer = 0;
      this.recentClicked += 1;
      this[this.nextState]();
    }

    // check if just switch the state last time.
    stateSwitchCheck(stateName) {
      if (this.currentState !== stateName) {
        this.ignoreTimer = 0;
        this.recentClicked = 0;
        this.currentState = stateName;
        this.nextState = stateName;
        catController.action[stateName]();
      }
    }

    // check click times and next state to switch to.
    stateClickCheck(stateName, clickTimes) {
      if (this.recentClicked >= clickTimes) {
        this.recentClicked = 0;
        this.nextState = stateName;
      }
    }

    // check ignore time and next state to switch to.
    stateIgnoreCheck(stateNameArray, stateArrayChance, ignoreTime) {
      if (this.ignoreTimer >= ignoreTime / this.stateFrequence) {
        this.ignoreTimer = 0;
        const totalChance = stateArrayChance.reduce((acc, cur) => {
          return (acc += cur);
        }, 0);
        let random = Math.ceil(Math.random() * totalChance, 0);
        let temp = 0;
        for (let i = 0; i < stateArrayChance.length; i += 1) {
          temp += stateArrayChance[i];
          if (random <= temp) {
            return (this.nextState = stateNameArray[i]);
          }
        }
        this.nextState = stateNameArray[0];
        return;
      }
    }

    async angry() {
      this.stateSwitchCheck('angry');
      this.stateClickCheck('hug', 3);
      this.stateIgnoreCheck(['superAngry', 'sleep'], [90, 10], 5);
    }

    async superAngry() {
      this.stateSwitchCheck('superAngry');
      this.stateClickCheck('angry', 3);
    }

    async hug() {
      this.stateSwitchCheck('hug');
      this.stateClickCheck('happy', 3);
      this.stateIgnoreCheck(['superHug'], [100], 30);
    }

    async superHug() {
      this.stateSwitchCheck('superHug');
      this.stateClickCheck('happy', 3);
      this.stateIgnoreCheck(['angry', 'sad'], [34, 66], 90);
    }

    async sad() {
      this.stateSwitchCheck('sad');
      this.stateClickCheck('happy', 3);
      this.stateIgnoreCheck(['superSad'], [100], 90);
    }
    async superSad() {
      this.stateSwitchCheck('superSad');
      this.stateClickCheck('happy', 3);
    }

    async happy() {
      this.stateSwitchCheck('happy');
      this.stateClickCheck('superHappy', 3);
      this.stateIgnoreCheck(['curious'], [100], 5);
    }

    async superHappy() {
      this.stateSwitchCheck('superHappy');
      this.stateClickCheck('crazy', 3);
      this.stateIgnoreCheck(['happy'], [100], 3);
    }

    async crazy() {
      this.stateSwitchCheck('crazy');
      this.stateIgnoreCheck(['happy'], [100], 3);
      // missionEvent(7, 2);
    }

    async curious() {
      this.stateSwitchCheck('curious');
      this.stateClickCheck('happy', 3);
      this.stateIgnoreCheck(['sleep', 'hug', 'excited', 'play'], [40, 20, 20, 20], 10);
    }

    async excited() {
      this.stateSwitchCheck('excited');
      this.stateClickCheck('happy', 3);
      this.stateIgnoreCheck(['curious', 'play'], [80, 20], 5);
    }

    async superExcited() {
      this.stateSwitchCheck('superExcited');
      this.stateClickCheck('happy', 3);
      this.stateIgnoreCheck(['excited'], [100], 5);
    }

    async play() {
      this.stateSwitchCheck('play');
      this.stateClickCheck('superPlay', 3);
      this.stateIgnoreCheck(['excited'], [100], 5);
    }

    async superPlay() {
      this.stateSwitchCheck('superPlay');
      this.stateIgnoreCheck(['play'], [100], 2);
      // missionEvent(7, 2);
    }

    async sleep() {
      this.stateSwitchCheck('sleep');
      this.stateClickCheck('happy', 3);
      this.stateIgnoreCheck(['curious'], [100], 60);
    }
  }

  useEffect(() => {
    // kitty = new catStateMachine('default', 2);
  }, []);

  const touchCat = () => {
    // kitty.getClick();
    // missionEvent(7, 1);
  };

  return (
    <div className="cat">
      <img className={catMove} style={catStyle} src={catSrc} onClick={touchCat} alt="cat" />
    </div>
  );
};

export default Cat;
