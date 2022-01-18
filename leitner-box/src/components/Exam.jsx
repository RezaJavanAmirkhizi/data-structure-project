import React, { useState } from 'react';
import Question from './Question';

const Exam = () => {

    // const [controller, setController] = useState(0);
    // const [words, setWords] = useState(JSON.parse(localStorage.getItem(('todayWords'))));
    // Word={words[controller]} answer={words.map((word) => word.persian)} setController = {setController}
    
    return (
        <div>
            <div className="examContainer">
                <Question Word="bvbbv" />
            </div>
        </div>
    );
    
}

export default Exam;