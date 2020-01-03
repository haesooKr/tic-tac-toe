import React from "react";

export default function Square(props) {
    return (
        <button
            className={winSquareCheck(props.winnerLine, props.number) ? 'square win' : 'square'} 
            onClick={props.onClick}
            >
            {props.value}
        </button>
    )
}

const winSquareCheck = (winnerLine, number) => {
    if(winnerLine){
        if(winnerLine.indexOf(number) > -1){
            return true;
        }
    }
    return false;
}