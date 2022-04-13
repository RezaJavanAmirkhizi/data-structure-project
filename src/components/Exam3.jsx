import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Exam3(props) {

    const exam3W = props.exam3Words;
    const [question, setQuestion] = useState([]);
    const [choices, setChoices] = useState({
        allChoises: [],
        correctChoice: 0
    })
    const [counter, setCounter] = useState({
        allCount: 0,
        correctCounter: 0,
    })
    const [message, setMessage] = useState('')
    let history = useNavigate();


    useEffect(() => {

        let questions = [];
        for (let i in exam3W) {
            questions.push(exam3W[i].english)
        }
        setQuestion(questions)

        let correctNumber = Math.floor(Math.random() * 4)
        let wrongNumbers = Math.floor(Math.random() * 25) + 1

        let value = []
        for (let i = wrongNumbers; i < props.questionWords.length; i++) {
            if (counter.allCount === 10) {
                break
            } else {
                if (props.questionWords[i].persian !== exam3W[counter.allCount].persian) {
                    if (value.length < 3) {
                        value.push(props.questionWords[i].persian)

                    }
                }
            }
        }

        value.splice(correctNumber, 0, exam3W[counter.allCount].persian) //adds the wanted choise to the wanted index in the array

        setChoices({
            allChoises: value,
            correctChoice: correctNumber
        })
    }, [])

    useEffect(() => {

        let correctNumber = Math.floor(Math.random() * 4)
        let wrongNumbers = Math.floor(Math.random() * 25) + 1

        let value = []
        for (let i = wrongNumbers; i < props.questionWords.length; i++) {
            if (counter.allCount === 10) {
                break
            } else {
                if (props.questionWords[i].persian !== exam3W[counter.allCount].persian) {
                    if (value.length < 3) {
                        value.push(props.questionWords[i].persian)

                    }
                }
            }
        }
        if (counter.allCount < 10) {
            value.splice(correctNumber, 0, exam3W[counter.allCount].persian) //adds the wanted choise to the wanted index in the array
        }


        setChoices({
            allChoises: value,
            correctChoice: correctNumber
        })

        if (counter.allCount === 9) {
            let done = ['1']
            localStorage.setItem('allowence', JSON.stringify(done))
        }
    }, [counter.allCount])

    const checkQuestion = (question) => {

        if (question === choices.allChoises[choices.correctChoice]) {
            if (exam3W[counter.allCount].level === 0) {
                exam3W[counter.allCount].level++;
                exam3W[counter.allCount].nextDate = new moment().add(3, "days").format('YYYY-MM-DD');
            }
            else if (exam3W[counter.allCount].level === 1) {
                exam3W[counter.allCount].level++;
                exam3W[counter.allCount].nextDate = new moment().add(5, "days").format('YYYY-MM-DD');
            }
            else {
                exam3W[counter.allCount].level++;
                exam3W[counter.allCount].nextDate = new moment().add(15, "days").format('YYYY-MM-DD');
            }
        }
        else {
            exam3W[counter.allCount].nextDate = new moment().add(1, "days").format('YYYY-MM-DD');
        }

        if (counter.allCount === exam3W.length - 2) {
            localStorage.setItem('check', JSON.stringify(new moment().format('YYYY-MM-DD')));
            setTimeout((() => {
                history('/')
            }), '10000');
        }
    }


    return (

        <div className='allExamContainer'>
            {
                counter.allCount === exam3W.length
                    ?
                    <div className='result'>
                        <span>
                            تعداد جواب های صحیح : {counter.correctCounter}

                        </span>
                        <span>
                            تعداد جواب های غلط : {counter.allCount - counter.correctCounter}
                        </span>
                        <span>
                            درصد : {((counter.correctCounter / counter.allCount) * 100).toFixed(0)} %
                        </span>
                    </div>
                    :
                    <div className='questionContainer'>
                        <div className='question'>
                            <span>
                                {question[counter.allCount]}
                            </span>
                        </div>
                        <hr />
                        <div className='choiseContainer'>
                            {
                                choices.allChoises.map((item, index) => {
                                    return <Fragment key={index}>
                                        <button onClick={() => {
                                            if (index === choices.correctChoice) {
                                                setCounter(counter => ({ ...counter, correctCounter: counter.correctCounter + 1 }))
                                                setMessage('درست')
                                            }
                                            else {
                                                setMessage('غلط')
                                            }
                                            checkQuestion(item)
                                            setTimeout(() => {
                                                setCounter(counter => ({ ...counter, allCount: counter.allCount + 1 }))
                                                setMessage('')
                                            }, 500)
                                        }}>
                                            {item}
                                        </button>
                                    </Fragment>
                                })
                            }
                        </div>
                        <div style={{ color: message === 'درست' ? 'green' : 'red' }}>
                            {message}
                        </div>
                    </div>
            }
        </div>
    )
}
