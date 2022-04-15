import React, { useState, useLayoutEffect, useEffect } from 'react';
import moment from 'moment';
import Exam1 from './Exam1';
import Exam2 from './Exam2';
import Exam3 from './Exam3';


const Exam = (props) => {

    const todayWords = props.words

    const [examStuff] = useState({
        exam1Stuff: [],
        exam2Stuff: [],
        exam3Stuff: [],
        remainedWordStuff: []
    })

    const [exams, setExams] = useState({
        exam1: false,
        exam2: false,
        exam3: false,
        toggle: true
    })

    const [enableExamButtons, setEnableExamButtons] = useState({
        exam1: false,
        exam2: true,
        exam3: true,
        return: false,
    })

    const [finished, setFinished] = useState(false);

    useLayoutEffect(() => {

        if (localStorage.getItem('goExam1') !== null) {
            setExams({
                exam1: true,
                exam2: false,
                exam3: false
            })
            setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
            localStorage.setItem('goExam1', null)
        }
        if (localStorage.getItem('goExam2') !== null) {
            setExams({
                exam1: false,
                exam2: true,
                exam3: false
            })
            setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
            localStorage.setItem('goExam2', null)
        }
        if (localStorage.getItem('goExam3') !== null) {
            setExams({
                exam1: false,
                exam2: false,
                exam3: true
            })
            setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
            localStorage.setItem('goExam3', null)
        }

        checkAllowence();

        const nullWords = [];

        if (nullWords.length === 0) {
            for (let i = 0; i < props.words.length; i++) {
                if (props.words[i].nextDate === null) {
                    nullWords.push(props.words[i]);
                }
            }
        }

        for (let i = 0; i < 10; i++) {
            examStuff.exam1Stuff.push(nullWords.shift())
        }
        for (let i = 0; i < 10; i++) {
            examStuff.exam2Stuff.push(nullWords.shift())
        }
        for (let i = 0; i < 10; i++) {
            examStuff.exam3Stuff.push(nullWords.shift())
        }
        console.log(examStuff);

        const today = moment().format("YYYY-MM-DD");

        for (let i = 0; i < props.words.length; i++) {
            if (today >= props.words[i].nextDate) {
                examStuff.remainedWordStuff.push(props.words[i])
            }
        }
        console.log(todayWords);
    }, [])

    useEffect(() => {

        for (let i = 0; i < props.words.length; i++) {
            for (let j = 0; j < todayWords.length; j++) {
                if (todayWords[j].id === props.words[i].id) {
                    props.words.splice(i, 1);
                }
            }
        }
        for (let i = 0; i < todayWords.length; i++) {
            if (finished === true) {
                props.words.push(todayWords[i]);
            }
        }
        if (finished === true) {
            localStorage.setItem('words', JSON.stringify(props.words));
            localStorage.setItem('allowence', null)
        }

    }, [finished])


    const checkAllowence = () => {

        let allow = JSON.parse(localStorage.getItem('allowence'))
        if ((allow !== null) && (typeof (allow) !== String)) {
            if (allow[1]) {
                setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, exam2: false, exam3: false }))
            }
            else if (allow[0]) {
                setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, exam2: false }))

            }
            else if (allow[0] === '1') {
                setFinished(true)
            }
        }
    }

    return (

        <div>
            {
                exams.toggle ?
                    <div className="examContainer">
                        <div aria-label='choiceContainer'>
                            <button onClick={() => {
                                setExams({
                                    exam1: true,
                                    exam2: false,
                                    exam3: false,
                                    toggle:false
                                })
                                setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
                            }} disabled={enableExamButtons.exam1}>
                                آزمون بخش اول کلمات
                            </button>
                            <button onClick={() => {
                                setExams({
                                    exam1: false,
                                    exam2: true,
                                    exam3: false,
                                    toggle: false
                                })
                                setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
                            }} disabled={enableExamButtons.exam2}>
                                آزمون بخش دوم کلمات
                            </button>
                            <button onClick={() => {
                                setExams({
                                    exam1: false,
                                    exam2: false,
                                    exam3: true,
                                    toggle: false
                                })
                                setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
                            }} disabled={enableExamButtons.exam3}>
                                آزمون بخش سوم کلمات
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        {
                            exams.exam1 ?
                                <Exam1 exam1Words={examStuff.exam1Stuff} questionWords={todayWords} />
                                : ''
                        }
                        {
                            exams.exam2 ?
                                <Exam2 exam2Words={examStuff.exam2Stuff} questionWords={todayWords} />
                                : ''
                        }
                        {
                            exams.exam3 ?
                                <Exam3 exam3Words={examStuff.exam3Stuff} questionWords={todayWords} />
                                : ''
                        }
                    </div>

            }
            {
                enableExamButtons.return ?
                    <button className='return' onClick={() => {
                        setExams({
                            exam1: false,
                            exam2: false,
                            exam3: false,
                            toggle: true
                        })
                        setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: false }))
                        checkAllowence()
                    }}>
                        بازگشت
                    </button>
                    : ''
            }
            <div>
                <a href='/secondpage/learn'>
                    <button  className='learnSender'>
                        صفحه آموزش
                    </button>
                </a>
            </div>
        </div>
    );

}

export default Exam;