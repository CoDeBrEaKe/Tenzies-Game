var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState } from 'react';
import { useEffect } from 'react';

import reactLogo from './assets/react.svg';
import Die from "./Die";
import Confetti from 'react-confetti';
import { nanoid } from "nanoid";

function App() {
  var _useState = useState(allNewDice()),
      _useState2 = _slicedToArray(_useState, 2),
      dice = _useState2[0],
      setDice = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      tenzies = _useState4[0],
      setTenzies = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      number = _useState6[0],
      setNumber = _useState6[1];

  var _useState7 = useState(function () {
    return 0;
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      time = _useState8[0],
      setTime = _useState8[1];

  var _useState9 = useState("00:00"),
      _useState10 = _slicedToArray(_useState9, 2),
      timeStamp = _useState10[0],
      setTimeStamp = _useState10[1];

  var _useState11 = useState(0),
      _useState12 = _slicedToArray(_useState11, 2),
      intervalId = _useState12[0],
      setIntervalId = _useState12[1];

  var _useState13 = useState(function () {
    return localStorage.getItem("best-time") ? localStorage.getItem("best-time") : "00:00";
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      bestTime = _useState14[0],
      setBestTime = _useState14[1];

  useEffect(function () {
    var newIntervalId = setInterval(function () {
      setTime(function (oldTime) {
        var newTime = oldTime + 1;
        console.log(newIntervalId);
        if (newTime < 10) {
          setTimeStamp("00:0" + newTime);
        } else {
          var min = parseInt(newTime / 60);
          var remain = newTime % 60;
          if (min < 10 && remain < 10) {
            setTimeStamp('0' + min + ':0' + remain);
          } else if (min < 10 && remain >= 10) {
            setTimeStamp('0' + min + ':' + remain);
          } else if (min >= 10 && remain >= 10) {
            setTimeStamp(min + ':' + remain);
          } else if (min >= 10 && remain < 10) {
            setTimeStamp(min + ':0' + remain);
          }
        }
        return newTime;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  }, []);
  // We Have to make state for the setInterval to stop it from useEffect
  useEffect(function () {
    if (tenzies) {
      if (bestTime == "00:00") {
        setBestTime(timeStamp);
        localStorage.setItem("best-time", timeStamp);
      } else {
        var num = bestTime.replace(":", ".");
        num = parseFloat(num);
        var newNum = timeStamp.replace(":", ".");
        newNum = parseFloat(newNum);
        if (newNum < num) {
          setBestTime(timeStamp);
          localStorage.setItem("best-time", timeStamp);
        }
        localStorage.setItem("best-time", timeStamp);
      }
      console.log("done");
      console.log(intervalId);
      clearInterval(intervalId);
      setIntervalId(0);
    }
  }, [tenzies]);

  useEffect(function () {
    var flag1 = dice.every(function (die) {
      return die.isHeld;
    });
    var flag2 = dice.every(function (die) {
      return die.value == dice[0].value;
    });
    if (flag1 && flag2) {

      setTenzies(true);
      console.log("won");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {

    var newDice = [];
    for (var i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  function _holdDice(id) {
    setDice(function (oldDice) {
      return oldDice.map(function (die) {
        return die.id == id ? Object.assign({}, die, { isHeld: !die.isHeld }) : die;
      });
    });
  }

  var dieElements = dice.map(function (die) {
    return React.createElement(Die, { holdDice: function holdDice() {
        return _holdDice(die.id);
      }, isHeld: die.isHeld, key: die.id, value: die.value });
  });

  function rollDice() {
    setDice(function (oldDice) {
      return oldDice.map(function (die) {
        return die.isHeld ? die : generateNewDie();
      });
    });
    setNumber(function (oldNum) {
      var newNum = oldNum + 1;
      return newNum;
    });
    if (tenzies) {
      setTime(0);
      setTimeStamp("00:00");
      setNumber(0);
      setTenzies(false);
      setDice(allNewDice);
      var newIntervalId = setInterval(function () {
        setTime(function (oldTime) {
          var newTime = oldTime + 1;
          console.log(newIntervalId);
          if (newTime < 10) {
            setTimeStamp("00:0" + newTime);
          } else {
            var min = parseInt(newTime / 60);
            var remain = newTime % 60;
            if (min < 10 && remain < 10) {
              setTimeStamp('0' + min + ':0' + remain);
            } else if (min < 10 && remain >= 10) {
              setTimeStamp('0' + min + ':' + remain);
            } else if (min >= 10 && remain >= 10) {
              setTimeStamp(min + ':' + remain);
            } else if (min >= 10 && remain < 10) {
              setTimeStamp(min + ':0' + remain);
            }
          }
          return newTime;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
    // console.log(allNewDice())
  }

  return React.createElement(
    'main',
    null,
    tenzies ? React.createElement(Confetti, null) : "",
    React.createElement(
      'h1',
      { className: 'title' },
      'Tenzies'
    ),
    React.createElement(
      'p',
      { className: 'instructions' },
      'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'
    ),
    React.createElement(
      'div',
      { className: 'dice-container' },
      dieElements
    ),
    React.createElement(
      'h3',
      { className: 'number' },
      'Number of Rolls : ',
      number,
      ' '
    ),
    React.createElement(
      'p',
      { className: 'time' },
      ' ',
      timeStamp,
      ' '
    ),
    React.createElement(
      'p',
      { className: 'time' },
      ' Your Best Time ',
      bestTime,
      ' '
    ),
    React.createElement(
      'button',
      { className: 'roll-dice', onClick: rollDice },
      tenzies ? "New Game" : "Roll"
    )
  );
}

export default App;