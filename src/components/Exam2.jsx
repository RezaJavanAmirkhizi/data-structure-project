import React, { useEffect, useState, Fragment } from 'react'
import moment from 'moment';


export default function Exam2(props) {

    const exam2W = props.exam2Words;
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

    const [allowence, setAllowence] = useState([true])


    useEffect(() => {

        let questions = [];
        for (let i in exam2W) {
            questions.push(exam2W[i].english)
        }
        setQuestion(questions)

        let correctNumber = Math.floor(Math.random() * 4)
        let wrongNumbers = Math.floor(Math.random() * 25) + 1

        let value = []
        for (let i = wrongNumbers; i < props.questionWords.length; i++) {
            if (counter.allCount === 10) {
                break
            } else {
                if (props.questionWords[i].persian !== exam2W[counter.allCount].persian) {
                    if (value.length < 3) {
                        value.push(props.questionWords[i].persian)

                    }
                }
            }
        }

        value.splice(correctNumber, 0, exam2W[counter.allCount].persian) //adds the wanted choise to the wanted index in the array

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
                if (props.questionWords[i].persian !== exam2W[counter.allCount].persian) {
                    if (value.length < 3) {
                        value.push(props.questionWords[i].persian)

                    }
                }
            }
        }
        if (counter.allCount < 10) {
            value.splice(correctNumber, 0, exam2W[counter.allCount].persian) //adds the wanted choise to the wanted index in the array
        }


        setChoices({
            allChoises: value,
            correctChoice: correctNumber
        })

        if (counter.allCount === 9) {
            setAllowence([true, true])
        }
        localStorage.setItem('allowence', JSON.stringify(allowence))


    }, [counter.allCount])

    const checkQuestion = (question) => {

        if (question === choices.allChoises[choices.correctChoice]) {
            if (exam2W[counter.allCount].level === 0) {
                exam2W[counter.allCount].level++;
                exam2W[counter.allCount].nextDate = new moment().add(3, "days").format('YYYY-MM-DD');
            }
            else if (exam2W[counter.allCount].level === 1) {
                exam2W[counter.allCount].level++;
                exam2W[counter.allCount].nextDate = new moment().add(5, "days").format('YYYY-MM-DD');
            }
            else {
                exam2W[counter.allCount].level++;
                exam2W[counter.allCount].nextDate = new moment().add(15, "days").format('YYYY-MM-DD');
            }
        }
        else {
            exam2W[counter.allCount].nextDate = new moment().add(1, "days").format('YYYY-MM-DD');
        }

    }




    return (

        <div className='allExamContainer'>
            {
                counter.allCount === exam2W.length
                    ?
                    <div className='result'>
                        <span style={{color:'green'}}>
                            تعداد جواب های صحیح : {counter.correctCounter}

                        </span>
                        <span style={{color:'red'}}>
                            تعداد جواب های غلط : {counter.allCount - counter.correctCounter}
                        </span>
                        <span style={{color:'white'}}>
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
