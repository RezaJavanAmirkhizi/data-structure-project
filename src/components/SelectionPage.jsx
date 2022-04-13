import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const SelectionPage = (props) => {

    const [check, setCheck] = useState(JSON.parse(localStorage.getItem('check')) === null ? null : JSON.parse(localStorage.getItem('check')));

    return (
        <div className="container1">
            <h1 className="h1">زبان آموز در خدمت شماست...</h1>
            <div className="container0">
                <div className="education">
                    <h3 className="title">آموزش</h3>
                    <p className="paragraph">آموزش روزانه 30 لغت انگلیسی به همراه ترجمه فارسی</p>
                    {
                        (check === null || check !== new moment().format('YYYY-MM-DD')) ?
                            <Link className="start" to="/secondpage/learn" onClick={() => window.location.href = "/secondpage/learn".reload()}>شروع</Link>
                            :
                            <p>.شما امروز در آموزش شرکت کرده اید</p>
                    }
                </div>
                <div className="exam">
                    <h3 className="title">آزمون</h3>
                    <p className="paragraph">آزمون جهت اطمینان از یادگیری لغات به وسیله سوالات 4 گزینه ای</p>
                    {
                        (check === null || check !== new moment().format('YYYY-MM-DD')) ?
                            <Link className="start" to="/secondpage/exam" onClick={() => window.location.href = "/secondpage/exam".reload()}>شروع</Link>
                            :
                            <p>.شما امروز در آزمون شرکت کرده اید</p>
                    }
                </div>
            </div>
        </div >
    );
}




export default SelectionPage;