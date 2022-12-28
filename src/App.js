import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      <Routes>
         <Route exact path="" element={<News key={'general'} category="general" countary="in"/>} />
          <Route exact path="/general" element={<News key={'general'} category="general" countary="in"/>} />
          <Route exact path="/sports" element={<News key={'sports'} category="sports" countary="in"/>} />
          <Route exact path="/business" element={<News key={'business'} category="business" countary="in"/>} />
          <Route exact path="/entertainment" element={<News key={'entertainment'} category="entertainment" countary="in"/>} />
          <Route exact path="/health" element={<News key={'health'} category="health" countary="in"/>} />
          <Route exact path="/science" element={<News key={'science'} category="science" countary="in"/>} />
          <Route exact path="/technology" element={<News key={'technology'} category="technology" countary="in"/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
