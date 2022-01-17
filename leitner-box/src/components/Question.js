import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const {Word, answer, setController} = this.props;
        return (
            <div className='questionContainer'>
                <h1>{Word.english}</h1>
                <hr  />               
                <Link className='answerLink' to="/Learn/Exam"></Link>
                <Link  className='answerLink' to="/Learn/Exam"></Link>
                <Link className='answerLink' to="/Learn/Exam"></Link>
                <Link className='answerLink' to="/Learn/Exam"></Link>
                <div className='buttonsDiv'>
                    <Link className='buttons' to="/Learn/Exam">قبلی</Link>
                    <Link className='buttons' to="/Learn/Exam">بعدی</Link>
                </div>
                
            </div>
        );
    }
}

export default Question;