import React, { useState, useLayoutEffect, useEffect } from 'react';
import moment from 'moment';
import Question from './Question';

const Exam = (props) => {

    const[todayWords, setTodayWords] = useState([]);
    const[finished, setFinished] = useState(false);

    useLayoutEffect(() => {

        let count = 0;
        const nullWords = [];


        while (count < 30) {
            if (nullWords.length === 0) {
                for (let i = 0; i < props.words.length; i++) {
                    if (props.words[i].nextDate === null) {
                        nullWords.push(props.words[i]);
                    }
                }
            }
            setTodayWords([...todayWords, todayWords.push(nullWords.shift())]);
            count++;
        }
        const today = moment().format("YYYY-MM-DD");

        for (let i = 0; i < props.words.length; i++) {
            if (today >= props.words[i].nextDate) {
                setTodayWords([...todayWords, todayWords.push(props.words[i])]);
            }
        }        
    }, [])

    useEffect(() => {
        
        for (let i = 0; i < props.words.length; i++) {
            for (let j = 0; j < todayWords.length; j++){
                if(todayWords[j].id === props.words[i].id){
                    props.words.splice(i, 1);
                }
            }
        }
        for (let i = 0; i < todayWords.length; i++){
            if(finished === true){
                props.words.push(todayWords[i]);
            }
        }

        if(finished === true){
            localStorage.setItem('words', JSON.stringify(props.words));
            console.log('set');
        }

    }, [finished])

    return (
        <div>
            <div className="examContainer">
                <Question todayWords={todayWords} changeWords={setTodayWords} setFinished={setFinished} />
            </div>
        </div>
    );
    
}

export default Exam;