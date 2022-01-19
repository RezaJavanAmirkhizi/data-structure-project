import React, { useState, useLayoutEffect } from 'react';
import moment from 'moment';
import Question from './Question';

const Exam = (props) => {

    const [controller, setController] = useState(0);

    const[todayWords, setTodayWords] = useState([]);

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
    
    return (
        <div>
            <div className="examContainer">
                <Question todayWords={todayWords}/>
            </div>
        </div>
    );
    
}

export default Exam;