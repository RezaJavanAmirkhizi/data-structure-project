import React, { Component } from 'react';

class Question extends Component {
    render() {
        // const {Word, answer, setController} = this.props;
        return (
            <div className='questionContainer'>
                <h1>test</h1>
                <hr  />
                <div className='choosebox'>
                    <label className="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                    <label className="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                    <br/>
                    <label className="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                    <label className="labl">
                        <input type="radio" name="radioname" value="another" />
                        <div>Small</div>
                    </label>
                </div> 
                <div className='buttonsDiv'>
                    <button className='buttons'>قبلی</button>
                    <button className='buttons'>بعدی</button>
                </div>
                
            </div>
        );
    }
}

export default Question;