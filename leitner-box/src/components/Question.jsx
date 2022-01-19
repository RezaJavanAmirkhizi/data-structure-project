import React, { useState, useEffect, Fragment } from 'react';

function Question(props) {

    const [answers, setAnswers] = useState([]);
    const [todayWords, setTodayWords] = useState(props.todayWords)
    const [eWord, setEWord] = useState();
    const [controller, setController] = useState(props.controller)


    const NOP = (type) => {
        if (type === 'next') {
            setController(controller + 1);
            setEWord(todayWords[controller].english);
        }
        else if (type === 'prev') {
            setController(controller - 1);
            setEWord(todayWords[controller].english);
        }
    }

    useEffect(() => {

        setTodayWords(props.todayWords)
        setEWord(todayWords[controller].english);

        let currentNum = Math.floor(Math.random() * 4) + 1;
        let mistakeNum = Math.floor(Math.random() * 25) + 1; //random number between 1 and 26

        let value = []
        for (let i = mistakeNum; i < (mistakeNum + 3); i++) {
            value.push(todayWords[i].persian);
        }

        console.log(value);
        value.splice(currentNum, 0, todayWords[controller].persian);
        setAnswers(value)

        console.log(answers);

    }, [])

    useEffect(() => {
        let currentNum = Math.floor(Math.random() * 4) + 1;
        let mistakeNum = Math.floor(Math.random() * 25) + 1; //random number between 1 and 26

        let value = []
        for (let i = mistakeNum; i < (mistakeNum + 3); i++) {
            value.push(todayWords[i].persian);
        }

        console.log(value);
        value.splice(currentNum, 0, todayWords[controller].persian);
        setAnswers(value)

        console.log(answers);


    },[controller])

    return (
        <div className='questionContainer'>
            <h1>{eWord}</h1>
            <hr />
            <div className='choosebox'>
                {answers.map((answer, index) => {
                    return <Fragment key={index}>
                        <div style={{ color: 'red' }}>
                            {answer}
                        </div>
                    </Fragment>
                })}
            </div>
            <div className='buttonsDiv'>
                {controller === 0 ? ''
                    :
                    <button onClick={() => NOP('prev')} className='buttons'>قبلی</button>
                }
                {controller === (todayWords.length - 1) ? ''
                    :
                    <button onClick={() => NOP('next')} className='buttons'>بعدی</button>
                }
            </div>

        </div>
    );
}

export default Question;