import '../src/styles/app.scss';
import FirstPage from '../src/components/FirstPage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="pages">
      <Routes>
        <Route exact path="/" element={<FirstPage />}></Route>
      </Routes>

    </div>
  );
}

export default App;
