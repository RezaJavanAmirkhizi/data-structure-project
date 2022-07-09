import React, { useState, useLayoutEffect, useEffect } from 'react';
import moment from 'moment';
import Question from './Question';

const Exam = (props) => {

    const[todayWords, setTodayWords] = useState([]);
    const[finished, setFinished] = useState(false);

    useLayoutEffect(() => {

        if (localStorage.getItem('goExam1') !== null) {
            setExams({
                exam1: true,
                exam2: false,
                exam3: false,
                toggle: false
            })
            setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
            localStorage.setItem('goExam1', null)
        }
        if (localStorage.getItem('goExam2') !== null) {
            setExams({
                exam1: false,
                exam2: true,
                exam3: false,
                toggle: false
            })
            setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
            localStorage.setItem('goExam2', null)
        }
        if (localStorage.getItem('goExam3') !== null) {
            setExams({
                exam1: false,
                exam2: false,
                exam3: true,
                toggle: false
            })
            setEnableExamButtons(enableExamButtons => ({ ...enableExamButtons, return: true }))
            localStorage.setItem('goExam3', null)
        }

        checkAllowence();

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
            {
                exams.toggle ?
                    <div>
                        <div className="examContainer">
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