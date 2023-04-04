
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import Document from './pages/document/document';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Home/> } path="/"/>
          <Route element={<Document/> } path="/document/:title"/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
