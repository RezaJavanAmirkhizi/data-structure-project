import React, { useState, useEffect, Fragment } from 'react';

function Question (props) {
    
    const answers = [];
    const [eWord, setEWord] = useState();


    const NOP = (type) => {
        if(type === 'next'){
            props.setController(props.controller + 1);
            setEWord(props.todayWords[props.controller].english);
        }
        else if(type === 'prev'){
            props.setController(props.controller - 1);
            setEWord(props.todayWords[props.controller].english);
        }
    }

    useEffect(() => {

        setEWord(props.todayWords[props.controller].english);
            
        let currentNum = Math.floor(Math.random() * 4) + 1;
        let mistakeNum = Math.floor(Math.random() * 25) + 1; //random number between 1 and 26

        for(let i = mistakeNum; i < (mistakeNum + 3); i++){
            answers.push(props.todayWords[i].persian);
        }

        answers.splice(currentNum, 0, props.todayWords[props.controller].persian);

        console.log(answers);

    }, [])

    return (
        <div className='questionContainer'>
            <h1>{eWord}</h1>
            <hr  />   
            <div className='choosebox'>
                {answers.map((answer, index) => {
                    return <Fragment key={index}>
                        <div>
                            <div>{answer}</div>
                        </div>
                    </Fragment>

                })}
            </div> 
            <div className='buttonsDiv'>
                <button onClick={() => NOP('next')} className='buttons'>قبلی</button>
                <button onClick={() => NOP('prev')} className='buttons'>بعدی</button>
            </div>
            
        </div>
    );
}

export default Question;