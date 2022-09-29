import React from 'react';

export default function Die(props) {
    var styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };

    var dots = [];
    for (var i = 0; i < props.value; i++) {
        dots[i] = React.createElement("div", { className: "dots" });
    }
    var css = void 0;
    if (props.value == 1) {
        css = "one";
    } else if (props.value == 2) {
        css = "two";
    } else if (props.value == 3) {
        css = "three";
    } else if (props.value == 4) {
        css = "four";
    } else if (props.value == 5) {
        css = "five";
    } else if (props.value == 6) {
        css = "six";
    }
    return React.createElement(
        "div",
        { className: "die-face " + css, onClick: props.holdDice, style: styles },
        dots
    );
}