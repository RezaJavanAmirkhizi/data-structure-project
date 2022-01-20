import React, { useState, useEffect, Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

function Question(props) {

    const [answers, setAnswers] = useState([]);
    const [todayWords] = useState(props.todayWords)
    const [eWord, setEWord] = useState();
    const [controller, setController] = useState(0);
    const [currectAnswer, setCurrectAnswer] = useState(0);
    const [curretCounter, setCurretCounter] = useState(0);
    const [message, SetMessage] = useState('');
    let history = useNavigate();

    useEffect(() => {

        setEWord(todayWords[controller].english);

        let currentNum = Math.floor(Math.random() * 4);
        let mistakeNum = Math.floor(Math.random() * 25) + 1; //random number between 1 and 26
        setCurrectAnswer(currentNum)

        let value = []
        for (let i = mistakeNum; i < (mistakeNum + 3); i++) {
            value.push(todayWords[i].persian);
        }

        value.splice(currentNum, 0, todayWords[controller].persian);
        setAnswers(value);
        setCurrectAnswer(currentNum);

    }, [])

    useEffect(() => {
        let currentNum = Math.floor(Math.random() * 4);
        let mistakeNum = Math.floor(Math.random() * 25) + 1; //random number between 1 and 26

        let value = []
        for (let i = mistakeNum; i < (mistakeNum + 3); i++) {
            value.push(todayWords[i].persian);
        }

        setCurrectAnswer(currentNum)

        value.splice(currentNum, 0, todayWords[controller].persian);
        setAnswers(value);

        if (controller === todayWords.length - 1) {
            props.changeWords(todayWords);
            props.setFinished(true);
        }

    }, [controller])

    const NOP = (type) => {
        if (type === 'next') {
            setController(controller + 1);
            setEWord(todayWords[controller + 1].english);
        }
    }

    const checkQuestion = (question) => {

        if (question === answers[currectAnswer]) {
            if (todayWords[controller].level === 0) {
                todayWords[controller].level++;
                todayWords[controller].nextDate = new moment().add(3, "days").format('YYYY-MM-DD');
            }
            else if (todayWords[controller].level === 1) {
                todayWords[controller].level++;
                todayWords[controller].nextDate = new moment().add(5, "days").format('YYYY-MM-DD');
            }
            else {
                todayWords[controller].level++;
                todayWords[controller].nextDate = new moment().add(15, "days").format('YYYY-MM-DD');
            }
        }
        else {
            todayWords[controller].nextDate = new moment().add(1, "days").format('YYYY-MM-DD');
        }

        if(controller === todayWords.length - 2){
            localStorage.setItem('check', JSON.stringify(new moment().format('YYYY-MM-DD')));
            setTimeout((() => {
                history('/');
            }), '2000');
        }

       
    }

    return (
        <>
            {controller === (todayWords.length - 1)
                    ?
                    <div className='result'>
                        <span style={{ color: 'green' }}>
                            تعداد جواب های صحیح : {curretCounter}
                        </span><br />
                        <span style={{ color: 'red' }}>
                            تعداد جواب های غلط : {todayWords.length - curretCounter}
                        </span><br />
                        <span style={{ color: 'white' }}>
                            %نمره : {((curretCounter / todayWords.length) * 100).toFixed(0)}
                        </span>
                    </div>
                    : 
                    <div className='questionContainer'>
                        <h1>{controller === (todayWords.length - 1) ? ''
                        : eWord}</h1><hr /><div className='choosebox'>
                            {answers.map((answer, index) => {
                                return <Fragment key={index}>
                                    <label className="labl">
                                        <input type="radio" name="radioname" value={answer} />
                                        <div onClick={() => {
                                            if (index === currectAnswer) {
                                                setCurretCounter(curretCounter + 1);
                                                SetMessage('correct');
                                            }
                                            else {
                                                SetMessage('wrong');
                                            }
                                            setTimeout((() => {
                                                NOP('next');
                                                checkQuestion(answer);
                                                SetMessage('');
                                            }), '500');
                                        } }>
                                            {controller === (todayWords.length - 1) ? '' : answer}
                                        </div>
                                    </label>
                                </Fragment>;
                            })}
                        </div><div className='messageStyle' style={{ color: 'white', fontSize: '30px' }}>
                            {message}
                        </div>
                    </div>
                }
            </>
        
    );
}

export default Question;