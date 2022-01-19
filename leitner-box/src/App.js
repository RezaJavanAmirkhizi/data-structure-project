import '../src/styles/app.scss';
import FirstPage from '../src/components/FirstPage'
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Words from '../src/data/words';
import SecondPage from './components/SecondPage'
import Exam from './components/Exam';
import Learn from './components/Learn';

function App() {

  const[words, setWords] = useState(Words());

  return (
    <div className="pages">
      <Routes>
        <Route exact path="/" element={<FirstPage words = {words} setWords={setWords} />}></Route>
        <Route exact path={"/secondpage"} element={<SecondPage/>}/>
        <Route exact path={"/secondpage/exam"} element={<Exam words={words}/>}></Route>
        <Route path='/secondpage/learn' element={<Learn words={words}/>}/>
      </Routes>

    </div>


  );
}

export default App;
