import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Question(props) {

    const [answers, setAnswers] = useState([]);
    const [todayWords] = useState(props.todayWords)
    const [eWord] = useState({
        eWords1: [],
        eWords2: [],
        eWords3: [],
    });

    const [enableExamButtons, setEnableExamButtons] = useState({
        exam1: true,
        exam2: true,
        exam3: true
    })

    const [examState, setExamState] = useState({
    })

    const [controller, setController] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [correctCounter, setCorrectCounter] = useState(0);
    const [message, SetMessage] = useState('');
    let history = useNavigate();


    useEffect(() => {

        let currentNum = Math.floor(Math.random() * 4);
        let mistakeNum = Math.floor(Math.random() * 25) + 1; //random number between 1 and 26
        setCorrectAnswer(currentNum)

        let value = []
        for (let i = mistakeNum; i < (mistakeNum + 3); i++) {
            value.push(todayWords[i].persian);
        }
        console.log(value);


        value.splice(currentNum, 0, todayWords[controller].persian);
        setAnswers(value);
        setCorrectAnswer(currentNum);

        for (let i in todayWords) {
            
            if (i <= 9) {
                eWord.eWords1.push(todayWords[i].english)
            }
            else if (i < 20) {
                eWord.eWords2.push(todayWords[i].english)
            }
            else if (i < 30) {
                eWord.eWords3.push(todayWords[i].english)
            }
        }
        
    }, [])

    useEffect(() => {

        let currentNum = Math.floor(Math.random() * 4);
        let mistakeNum = Math.floor(Math.random() * 25) + 1; //random number between 1 and 26

        let value = []
        for (let i = mistakeNum; i < (mistakeNum + 3); i++) {
            value.push(todayWords[i].persian);
        }

        setCorrectAnswer(currentNum)

        value.splice(currentNum, 0, todayWords[controller].persian)
        setAnswers(value);

        if (controller === todayWords.length - 1) {
            props.changeWords(todayWords);
            props.setFinished(true);
        }

    }, [controller])

    // const NOP = () => {
    //     setController(controller + 1);
    // }

    const checkQuestion = (question) => {

        if (question === answers[correctAnswer]) {
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

        if (controller === todayWords.length - 2) {
            localStorage.setItem('check', JSON.stringify(new moment().format('YYYY-MM-DD')));
            localStorage.setItem('lastlight', null)
            setTimeout((() => {
                props.setExamState()
            }), '10000');
        }
    }

    return (
        <>
            {controller === (todayWords.length - 1)
                ?
                <div className='result'>
                    <span style={{ color: 'green' }}>
                        تعداد جواب های صحیح : {correctCounter}
                    </span><br />
                    <span style={{ color: 'red' }}>
                        تعداد جواب های غلط : {todayWords.length - correctCounter}
                    </span><br />
                    <span style={{ color: 'white' }}>
                        %نمره : {((correctCounter / todayWords.length) * 100).toFixed(0)}
                    </span>
                </div>
                :
                <div>

                    
                        <div aria-label='choiceContainer'>
                            
                                <a href="/secondpage/exam/exam1">
                                    <button disabled={enableExamButtons.exam1}>
                                        آزمون بخش اول کلمات
                                    </button>
                                </a>
                            
                            
                                <a href="/secondpage/exam/exam2">
                                    <button disabled={enableExamButtons.exam2}>
                                        آزمون بخش دوم کلمات
                                    </button>
                                </a>
                            
                            
                                <a href="/secondpage/exam/exam3">
                                    <button disabled={enableExamButtons.exam3}>
                                        آزمون بخش سوم کلمات
                                    </button>
                                </a>
                            
                        </div>
                    
                    {/* <div className='questionContainer'>
                        <div aria-label='exam1'>
                            {
                                examState.exam1 ?
                                    <div>
                                        {eWord.eWords1.map((word, index) => {
                                            return <Fragment key={index}>
                                                <h1>{ }</h1>
                                            </Fragment>
                                        })}
                                        <hr /><div className='choosebox'>
                                            {answers.map((answer, index) => {
                                                return <Fragment key={index}>
                                                    <label className="labl">
                                                        <input type="radio" name="radioname" value={answer} />
                                                        <div onClick={() => {
                                                            if (index === correctAnswer) {
                                                                setCorrectCounter(correctCounter + 1);
                                                                SetMessage('correct');
                                                            }
                                                            else {
                                                                SetMessage('wrong');
                                                            }
                                                            setTimeout((() => {
                                                                setController(controller + 1)
                                                                checkQuestion(answer);
                                                                SetMessage('');
                                                            }), '500');
                                                        }}>
                                                            {controller === (todayWords.length - 1) ? '' : answer}
                                                        </div>
                                                    </label>
                                                </Fragment>;
                                            })}
                                        </div>
                                    </div>
                                    : ''
                            }
                            <div className='messageStyle' style={{ color: message === 'correct' ? 'green' : 'red', fontSize: '30px' }}>
                                {message}
                            </div>
                        </div>

                        {
                            examState.back ?
                                <button onClick={() => {
                                    setExamState({
                                        exam1Toggler: true,
                                        exam2Toggler: true,
                                        exam3Toggler: true,
                                        exam1: false,
                                        exam2: false,
                                        exam3: false,
                                        back: false
                                    })
                                    setController(0)
                                    console.log(eWord);
                                }}>
                                    بازگشت
                                </button>
                                : ''
                        }

                    </div> */}
                    {/* <h1>
                        {
                        controller === (todayWords.length - 1) ? ''
                        : eWord
                        }
                        </h1><hr /><div className='choosebox'>
                        {answers.map((answer, index) => {
                            return <Fragment key={index}>
                                <label className="labl">
                                    <input type="radio" name="radioname" value={answer} />
                                    <div onClick={() => {
                                        if (index === correctAnswer) {
                                            setCorrectCounter(correctCounter + 1);
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
                                    }}>
                                        {controller === (todayWords.length - 1) ? '' : answer}
                                    </div>
                                </label>
                            </Fragment>;
                        })}
                    </div>
                    <div className='messageStyle' style={{ color: message === 'correct' ? 'green' : 'red', fontSize: '30px' }}>
                        {message}
                    </div> */}
                </div>
            }
        </>

    );
}

export default Question;