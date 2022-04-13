import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import moment from 'moment';


export default function Learn(props) {

    const [todayWords] = useState({
        words1: [],
        words2: [],
        words3: [],
        remainedWords: [],
    });

    const [wordsState, setWordsState] = useState({
        word1: false,
        word2: false,
        word3: false,
        remainedWords: false,
        toggle: true,
        return: false
    })

    const [buttonState, setButtonState] = useState({
        buttonWord1: false,
        buttonWord2: true,
        buttonWord3: true,
    })

    useEffect(() => {

        let allow = JSON.parse(localStorage.getItem('allowence')) === null ? null : JSON.parse(localStorage.getItem('allowence'))
        if (allow !== null) {
            if (allow[1] === true) {
                setButtonState(buttonState => ({...buttonState, buttonWord2: false, buttonWord3: false}))
            }
            else if (allow[0] === true) {
                setButtonState(buttonState => ({...buttonState, buttonWord2 : false}))
            }
        }

        const nullWords = [];

        if (nullWords.length === 0) {
            for (let i = 0; i < props.words.length; i++) {
                if (props.words[i].nextDate === null) {
                    nullWords.push(props.words[i]);
                }
            }
        }

        const today = moment().format("YYYY-MM-DD");

        for (let i = 0; i < 10; i++) {
            todayWords.words1.push(nullWords.shift())
        }
        for (let i = 0; i < 10; i++) {
            todayWords.words2.push(nullWords.shift())
        }
        for (let i = 0; i < 10; i++) {
            todayWords.words3.push(nullWords.shift())
        }

        let result = JSON.parse(localStorage.getItem('done'))

        if (result !== null) {

            if (result[0] === true) {
                setButtonState(buttonState => ({ ...buttonState, buttonWord2: false }))
            }
            if (result[1] === true) {
                setButtonState(buttonState => ({ ...buttonState, buttonWord3: false }))
            }
        }

        for (let i = 0; i < props.words.length; i++) {
            if (today >= props.words[i].nextDate) {
                todayWords.remainedWords.push(props.words[i]);
            }
        }
    }, [])


    //https://github.com/RezaJavanAmirkhizi/data-structure-project.git

    return (
        <div>
            <div>

                {
                    wordsState.toggle ?
                        <div className='buttonsPlace'>
                            <button onClick={() => {
                                if (wordsState.word1 === true) return
                                else {
                                    if (todayWords.words1.length === 0) {
                                        alert("کلمه ای وجود ندارد")
                                    }
                                    else {
                                        setWordsState({
                                            word1: true,
                                            word2: false,
                                            word3: false,
                                            remainedWords: false,
                                            toggle: false,
                                            return: true
                                        })
                                    }
                                }
                            }}>
                                نمایش سری اول کلمات
                            </button>

                            <button onClick={() => {
                                if (wordsState.word2 === true) return
                                else {
                                    if (todayWords.words2.length === 0) {
                                        alert("کلمه ای وجود ندارد")
                                    }
                                    if (buttonState.buttonWord2) {
                                        alert("شما هنوز آزمون اول را تکمیل نکرده اید")
                                    }
                                    else {
                                        setWordsState({
                                            word1: false,
                                            word2: true,
                                            word3: false,
                                            remainedWords: false,
                                            toggle: false,
                                            return: true
                                        })
                                    }
                                }
                            }}>
                                نمایش سری دوم کلمات
                            </button>

                            <button onClick={() => {
                                if (wordsState.word3 === true) return
                                else {
                                    if (todayWords.words3.length === 0) {
                                        alert("کلمه ای وجود ندارد")
                                    }
                                    if (buttonState.buttonWord3) {
                                        alert("شما هنوز آزمون های قبلی را تکمیل نکرده اید")
                                    }
                                    else {
                                        setWordsState({
                                            word1: false,
                                            word2: false,
                                            word3: true,
                                            remainedWords: false,
                                            toggle: false,
                                            return: true
                                        })
                                    }
                                }
                            }}>
                                نمایش سری سوم کلمات
                            </button>

                            <button onClick={() => {
                                if (wordsState.remainedWords === true) return
                                else {
                                    if (todayWords.remainedWords.length === 0) {
                                        alert("کلمه ای وجود ندارد")
                                    }
                                    else {
                                        setWordsState({
                                            word1: false,
                                            word2: false,
                                            word3: false,
                                            remainedWords: true,
                                            toggle: false,
                                            return: true
                                        })
                                    }
                                }
                            }}>
                                نمایش سری کلمات غلط زده شده
                            </button>

                        </div>
                        : ''
                }
            </div>

            <div className='titles'>
                <div>
                    {
                        (wordsState.word1 || wordsState.word2 || wordsState.word3 === true) ?
                            <div className='head'>
                                <div className='rowStyle'>
                                    Row
                                </div>
                                <div>
                                    English
                                </div>
                                <div>
                                    Persian
                                </div>
                            </div>
                            : ''
                    }

                </div>
                <div>
                    {
                        wordsState.word1 ?
                            <div className='rows'>
                                {todayWords.words1.map((item, index) => {
                                    return <Fragment key={index}>
                                        <div>
                                            {index + 1}
                                        </div>
                                        <div>
                                            {item.english}
                                        </div>
                                        <div>
                                            {item.persian}
                                        </div>
                                    </Fragment>
                                })
                                }
                                <a href='/secondpage/exam'>
                                    <div className='examPageSender'>
                                        <button onClick={() => {
                                            localStorage.setItem('goExam1', 'go')
                                        }}>
                                            آزمون اول
                                        </button>
                                    </div>
                                </a>


                            </div>
                            : ''
                    }
                </div>

                <div>
                    {
                        wordsState.word2 ?
                            <div className='rows'>
                                {todayWords.words2.map((item, index) => {
                                    return <Fragment key={index}>
                                        <div>
                                            {index + 1}
                                        </div>
                                        <div>
                                            {item.english}
                                        </div>
                                        <div>
                                            {item.persian}
                                        </div>
                                    </Fragment>
                                })}

                                <a href='/secondpage/exam'>
                                    <div className='examPageSender'>
                                        <button onClick={() => {
                                            localStorage.setItem('goExam2', 'go')
                                        }}>
                                            آزمون دوم
                                        </button>
                                    </div>
                                </a>


                            </div>
                            : ''
                    }
                </div>

                <div>
                    {
                        wordsState.word3 ?
                            <div className='rows'>
                                {todayWords.words3.map((item, index) => {
                                    return <Fragment key={index}>
                                        <div>
                                            {index + 1}
                                        </div>
                                        <div>
                                            {item.english}
                                        </div>
                                        <div>
                                            {item.persian}
                                        </div>
                                    </Fragment>
                                })}
                                <a href='/secondpage/exam'>
                                    <div className='examPageSender'>
                                        <button onClick={() => {
                                            localStorage.setItem('goExam3', 'go')
                                        }}>
                                            آزمون سوم
                                        </button>
                                    </div>
                                </a>

                            </div>
                            : ''
                    }
                </div>
                <div>
                    {
                        wordsState.remainedWords && wordsState.toggle ?
                            <div className='rows'>
                                {todayWords.remainedWords.map((item, index) => {
                                    return <Fragment key={index}>
                                        <div>
                                            {index + 1}
                                        </div>
                                        <div>
                                            {item.english}
                                        </div>
                                        <div>
                                            {item.persian}
                                        </div>
                                    </Fragment>
                                })}
                                <a href="#">
                                    <div className='examPageSender'>
                                        <button>
                                            آزمون کلمات غلط زده شده
                                        </button>
                                    </div>
                                </a>


                            </div>
                            : ''
                    }
                </div>
            </div>
            {
                wordsState.return ?
                    <div className='buttonsPlace'>
                        <button onClick={() => {
                            setWordsState({
                                word1: false,
                                word2: false,
                                word3: false,
                                remainedWords: false,
                                toggle: true,
                                return: false
                            })
                        }}>
                            بازگشت
                        </button>
                    </div>
                    : ''
            }
        </div>
    )
}
