import '../src/styles/app.scss';
import FirstPage from '../src/components/FirstPage'
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Words from '../src/data/words';
import Learn from '../src/components/Learn'
import Exam from './components/Exam';

function App() {

  const[words, setWords] = useState(Words());

  return (
    <div className="pages">
      <Routes>
        <Route exact path="/" element={<FirstPage words = {words} setWords={setWords} />}></Route>
        <Route exact path="/Learn" element={<Learn words = {words} />}></Route>
        <Route exact path="/Learn/Exam" element={<Exam />}></Route>
         
      </Routes>

    </div>
  );
}

export default App;
