import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Learn extends Component {
    render() {
        return (
            <div className="container1">
                <h1 className="h1">زبان آموز در خدمت شماست...</h1>
                <div className="container0">
                    <div className="education">
                        <h3 className="title">آموزش</h3>
                        <p className="paragraph">آموزش روزانه 30 لغت انگلیسی به همراه ترجمه فارسی</p>
                        <Link className="start" to="/Learn">شروع</Link>
                    </div>
                    <div className="exam">
                        <h3 className="title">آزمون</h3>
                        <p className="paragraph">آزمون جهت اطمینان از یادگیری لغات به وسیله سوالات 4 گزینه ای</p>
                        <Link className="start" to="/Learn/Exam">شروع</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Learn;