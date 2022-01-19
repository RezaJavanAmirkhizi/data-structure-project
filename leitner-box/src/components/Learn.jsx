import React, { useEffect, useState, Fragment } from 'react'
import moment from 'moment';


export default function Learn(props) {

    const[todayWords, setTodayWords] = useState([]);

    useEffect(() => {

        let count = 0;
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

    return (
        <div>
            <div className='titles' style={{ display: 'block' }}>
                {
                    <div style={{ display: 'block', color: 'red' }}>
                        <div className='rowStyle' style={{ display: 'inline-block', width: '10%' }}>
                            Row
                        </div>
                        <div style={{ display: 'inline-block', width: '47%' }}>
                            English
                        </div>
                        <div style={{ display: 'inline-block', width: '20%' }}>
                            Persian
                        </div>
                    </div>
                }
                <div style={{ display: 'block' }}>
                    {
                        <div>
                            {
                                todayWords.map((item, index) => {
                                    return <Fragment key={index}>
                                        <div style={{ dispaly: 'block' }}>
                                            <div className='wordsContainer' style={{ display: 'inline-block', color: 'white', width: '10%' }}>
                                                {index + 1}
                                            </div>
                                            <div style={{ display: 'inline-block', width: '47%' }}>
                                                {item.english}
                                            </div>
                                            <div style={{ display: 'inline-block', width: '20%' }}>
                                                {item.persian}
                                            </div>
                                        </div>
                                    </Fragment>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
