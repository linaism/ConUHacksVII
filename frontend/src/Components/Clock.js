import React, { useState, useEffect } from 'react';
import BarGraph from './BarGraph';
import { UserData } from '../Data'



function Clock() {
    const [time, setTime] = useState("9:28:00");
    const [counter, setCounter] = useState(0);
    //FOR THE TRANSACTION BAR GRAPH
    const [transactionData, setTransactionData] = useState({
        labels: [],
        datasets: [{
            label: 'Transactions Completed',
            backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
        }]
      });

    //FOR THE TRANSITION BAR GRAPH
    const [cancellationData, setCancellationData] = useState({
        labels: [],
        datasets: [{
            label: 'Transactions Cancelled',
            backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
        }]
      });
    const input = UserData[0];
    const cancelInput = UserData[0];

    const newTransactionData = {
        labels: [],
        datasets: [{
            label: 'Transactions Completed',
            backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
        }]
      }
    input.forEach(element => {
        
        newTransactionData.labels.push(element[0]);
        newTransactionData.datasets[0].data.push(element[1]);
        
    });

    const newCancellationData = {
        labels: [],
        datasets: [{
            label: 'Transactions Cancelled',
            backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
        }]
      }
    cancelInput.forEach(element => {
        
        newCancellationData.labels.push(element[0]);
        newCancellationData.datasets[0].data.push(element[1]);
        
    });

    useEffect(() => {
        setTransactionData(newTransactionData);
        setCancellationData(newCancellationData);
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
                    
                    const input = UserData[prevCounter];
                    const cancelInput = UserData[prevCounter];

                    const newData = {
                        labels: [],
                        datasets: [{
                            label: 'Transactions Completed',
                            backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"],
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: []
                        }]
                      }

                    input.forEach(element => {
                        
                        newData.labels.push(element[0]);
                        newData.datasets[0].data.push(element[1]);
                    });

                    const newCancellationData = {
                        labels: [],
                        datasets: [{
                            label: 'Transactions Cancelled',
                            backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"],
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: []
                        }]
                      }
                    cancelInput.forEach(element => {
                        
                        newCancellationData.labels.push(element[0]);
                        newCancellationData.datasets[0].data.push(element[1]);
                        
                    });

                    setTransactionData(newData);
                    setCancellationData(newCancellationData);
                //}
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
            <BarGraph chartData={transactionData} />
            <BarGraph chartData={cancellationData} />
        </div>
        
    );
} export { Clock }