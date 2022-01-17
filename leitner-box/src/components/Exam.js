import React, { Component } from 'react';
import Question from './Question';

class Exam extends Component {
    render() {

        return (
            <div>
                <div className="examContainer">
                    <Question Word="test" one="یک" two="دو" three="سه" four="چهار" />
                </div>
            </div>
        );
    }
}

export default Exam;