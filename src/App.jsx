import { useState } from 'react'
import { useEffect } from 'react'

import reactLogo from './assets/react.svg'
import Die from "./Die"
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"

function App(){
  const [dice , setDice] = useState(allNewDice())
  const [tenzies, setTenzies]  = useState(false);
  const [number , setNumber] = useState(0)
  const [time , setTime] = useState(()=> 0)
  const [timeStamp , setTimeStamp] = useState("00:00")
  const [intervalId, setIntervalId] = useState(0);
  const [bestTime, setBestTime] = useState(()=>localStorage.getItem("best-time") ? localStorage.getItem("best-time") :"00:00");

  useEffect(()=>{
    const newIntervalId = setInterval(() => {
        setTime(
          (oldTime) =>{ 
          let newTime = oldTime + 1
            console.log(newIntervalId)
          if (newTime<10){
            setTimeStamp("00:0"+newTime)
          }else{
            let min = parseInt(newTime/60)
            let remain = newTime%60
            if (min<10 && remain < 10)
            {
              setTimeStamp(`0${min}:0${remain}`)
            }else if(min < 10 && remain >= 10){
              setTimeStamp(`0${min}:${remain}`)
            }else if (min >= 10 && remain >= 10){
              setTimeStamp(`${min}:${remain}`)
            }
            else if (min >= 10 && remain < 10){
              setTimeStamp(`${min}:0${remain}`)
            }
          }
          return newTime
        }
        )
    }, 1000);
    setIntervalId(newIntervalId);
    
  },[])
  // We Have to make state for the setInterval to stop it from useEffect
  useEffect(() => {
    if(tenzies){
    if(bestTime == "00:00")
    {
      setBestTime(timeStamp)
      localStorage.setItem("best-time",timeStamp)
    }else{
      let num = bestTime.replace(":" , ".")
      num = parseFloat(num)
      let newNum = timeStamp.replace(":" , ".")
      newNum = parseFloat(newNum)
      if (newNum < num)
      {
        setBestTime(timeStamp)
        localStorage.setItem("best-time",timeStamp)
      }
      localStorage.setItem("best-time",timeStamp)
    }
    console.log("done")
    console.log(intervalId)
    clearInterval(intervalId);
    setIntervalId(0);
}
  },[tenzies])
  
  useEffect(()=>{
    let flag1 = dice.every(die=>die.isHeld)
    let flag2 = dice.every(die=>die.value == dice[0].value)
    if (flag1 && flag2){
      
      setTenzies(true)
      console.log("won")
    }
  } , [dice])

  function generateNewDie(){
    return {
      value:Math.ceil(Math.random() * 6) ,
        isHeld : false ,
        id : nanoid()
      }
  }

  function allNewDice(){
    
    const newDice = []
    for (let i = 0 ; i < 10; i++)
    {
    newDice.push(generateNewDie())
    }
    return newDice 
  }
  function holdDice(id){
    setDice(oldDice => oldDice.map(die=> die.id == id ?  {...die, isHeld:!die.isHeld} : die))
  }

  const dieElements = dice.map(die=> <Die holdDice={()=>holdDice(die.id)} isHeld={die.isHeld} key={die.id} value = {die.value}/>)

  function rollDice(){
    setDice(
      oldDice => oldDice.map(die=>{
        return die.isHeld?
        die:
        generateNewDie()
      })
      )
      setNumber((oldNum)=> {
        let newNum= oldNum +1
        return newNum
      })
      if (tenzies){
      setTime(0)
      setTimeStamp("00:00")
      setNumber(0)
      setTenzies(false)
      setDice(allNewDice)
      const newIntervalId = setInterval(() => {
        setTime(
          (oldTime) =>{ 
          let newTime = oldTime + 1
            console.log(newIntervalId)
          if (newTime<10){
            setTimeStamp("00:0"+newTime)
          }else{
            let min = parseInt(newTime/60)
            let remain = newTime%60
            if (min<10 && remain < 10)
            {
              setTimeStamp(`0${min}:0${remain}`)
            }else if(min < 10 && remain >= 10){
              setTimeStamp(`0${min}:${remain}`)
            }else if (min >= 10 && remain >= 10){
              setTimeStamp(`${min}:${remain}`)
            }
            else if (min >= 10 && remain < 10){
              setTimeStamp(`${min}:0${remain}`)
            }
          }
          return newTime
        }
        )
    }, 1000);
    setIntervalId(newIntervalId);
    
      }
    // console.log(allNewDice())

  }
  
  
  return(
    <main>
      {tenzies ? <Confetti /> :""}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {dieElements}
      </div>
      <h3 className='number'>Number of Rolls : {number} </h3>
        <p className='time'> { timeStamp  } </p>
        <p className='time'> Your Best Time {bestTime} </p>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}


export default App
