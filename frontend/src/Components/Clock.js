import React, { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState("9:28:00");
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                const [hours, minutes, seconds] = prevTime.split(":").map(Number);
                let newSeconds = seconds + 1;
                let newMinutes = minutes;
                let newHours = hours;
                if (newSeconds === 60) {
                    newSeconds = 0;
                    newMinutes += 1;
                }
                if (newMinutes === 60) {
                    newMinutes = 0;
                    newHours += 1;
                }
                if (newHours === 9 && newMinutes === 32) {
                    clearInterval(interval);
                }
                return `${newHours}:${newMinutes}:${newSeconds}`;
            });
            setCounter(prevCounter => {
                if(prevCounter < 240) {
                    return prevCounter + 1;
                }
                return prevCounter
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div>{time}</div>
            <div>Counter: {counter}</div>
        </div>
    );
} export { Clock }