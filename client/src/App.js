import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Home from "./Components/Pages/Home"
import Explore from "./Components/Pages/Explore";
import SingleQuestion from "./Components/Pages/SingleQuestion";
function App() {
  return (
   

    <Router>
    <Routes> 
      
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/singleQuestion/:QuestionId" element={<SingleQuestion/>}/>
    <Route path="/explore" element={<Explore/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
   </Routes>
  </Router>
  );
}

export default App;
