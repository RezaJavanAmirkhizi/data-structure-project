import moment from 'moment';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Learn = (props) => {

    const[words, setWords] = useState(props.words);
    
    
    

    const start = async () => {

        let count = 0;
        const nullWords = [];

        while (count < 30) {
            if(nullWords.length === 0){
                for (let i = 0; i < words.length; i++) {
                    if(words[i].nextDate === null) {
                        nullWords.push(words[i]);
                    }
                }
            }

            props.setTodayWords(...props.todayWords, props.todayWords.push(nullWords.shift()));
            count++;
        }

        const today = moment().format("YYYY-MM-DD");

        for(let i = 0; i < words.length; i++) {
            if(today >= words[i].nextDate){
                props.setTodayWords(...props.todayWords, props.todayWords.push(words[i]));
            }
        }
         
    }

    return (
        <div className="container1">
            <h1 className="h1">زبان آموز در خدمت شماست...</h1>
            <div className="container0">
                <div className="education">
                    <h3 className="title">آموزش</h3>
                    <p className="paragraph">آموزش روزانه 30 لغت انگلیسی به همراه ترجمه فارسی</p>
                    <Link onClick={() => start()} className="start" to="/Learn">شروع</Link>
                </div>
                <div className="exam">
                    <h3 className="title">آزمون</h3>
                    <p className="paragraph">آزمون جهت اطمینان از یادگیری لغات به وسیله سوالات 4 گزینه ای</p>
                    <Link  className="start" to="/Learn/Exam">شروع</Link>
                </div>
            </div>
        </div>
        );
    
}
    
    


export default Learn;