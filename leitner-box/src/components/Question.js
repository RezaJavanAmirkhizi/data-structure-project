import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const {Word, one, two, three, four} = this.props;
        return (
            <div className='questionContainer'>
                <h1>{Word}</h1>
                <hr  />               
                <Link className='answerLink' to="/Learn/Exam">{one}</Link>
                <Link  className='answerLink' to="/Learn/Exam">{two}</Link>
                <Link className='answerLink' to="/Learn/Exam">{three}</Link>
                <Link className='answerLink' to="/Learn/Exam">{four}</Link>
                <div className='buttonsDiv'>
                    <Link className='buttons' to="/Learn/Exam">قبلی</Link>
                    <Link className='buttons' to="/Learn/Exam">بعدی</Link>
                </div>
                
            </div>
        );
    }
}

export default Question;