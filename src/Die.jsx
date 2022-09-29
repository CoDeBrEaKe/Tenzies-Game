import React from 'react'

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    const dots=[]
    for(let i = 0 ; i < props.value; i++){
        dots[i] = <div className='dots'></div>
    }
    let css;
        if (props.value == 1 ){
             css = "one";
        }else if (props.value == 2 ){
             css = "two";
        }
        else if (props.value == 3 ){
             css = "three";
        }
        else if (props.value == 4 ){
             css = "four";
        }
        else if (props.value == 5 ){
             css = "five";
        }
        else if (props.value == 6 ){
             css = "six";
        }
    return(
        <div className={`die-face ${css}`} onClick={props.holdDice} style={styles}>
            {dots}
        </div>
    )
}