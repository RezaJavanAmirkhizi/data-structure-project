import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        // const {Word, answer, setController} = this.props;
        return (
            <div className='questionContainer'>
                <h1>test</h1>
                <hr  />   
                <div className='choosebox'>
                    <label class="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                    <label class="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                    <br/>
                    <label class="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                    <label class="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                </div> 
                <div className='buttonsDiv'>
                    <Link className='buttons' to="/Learn/Exam">قبلی</Link>
                    <Link className='buttons' to="/Learn/Exam">بعدی</Link>
                </div>
                
            </div>
        );
    }
}

export default Question;