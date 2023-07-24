import './App.css';
import React from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellForm from './components/SellForm';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import IndivProperty from './components/IndivProperty';
import NotFound from './components/NotFound';
import PropertyPage from './components/PropertyPage';
import LoginPage from './components/LoginPage';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<PropertyPage pageType={"buy"} />}
          ></Route>
          <Route
            exact
            path="/rent"
            element={<PropertyPage pageType={"rent"} />}
          ></Route>
          <Route exact path="/sell" element={<SellForm />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/indivproperty" element={<IndivProperty />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
