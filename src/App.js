import '../src/styles/app.scss';
import FirstPage from './components/WelcomePage'
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Words from '../src/data/words';
import SelectionPage from './components/SelectionPage'
import Exam from './components/Exam';
import Learn from './components/Learn';

function App() {

    const [words, setWords] = useState(JSON.parse(localStorage.getItem('words')) === null ? Words() : JSON.parse(localStorage.getItem('words')));

    return (
        <div className="pages">

            <Routes>
                <Route exact path="/" element={<FirstPage words={words} setWords={setWords} />}></Route>
                <Route exact path={"/secondpage"} element={<SelectionPage />} />
                <Route exact path={"/secondpage/exam"} element={<Exam words={words} />}></Route>
                <Route path='/secondpage/learn' element={<Learn words={words} />} />
            </Routes>

        </div>


    );
}

export default App;
