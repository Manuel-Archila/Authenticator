import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Files from './views/Files/Files';
import Login from './views/Login/Login';
import Register from './views/Register/Register';


import './App.css';



function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/files" element={<Files />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
