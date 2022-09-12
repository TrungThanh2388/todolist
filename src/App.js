
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import ListUser from './component/ListUser';
import Singup from './component/Singup';
import Detail from './component/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
          <Route path="/" element={<Singup />}/>
          <Route path="/list" element={<ListUser />}/>
          <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
