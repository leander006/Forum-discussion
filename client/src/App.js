import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Home from "./Components/Pages/Home"
import Explore from "./Components/Pages/Explore";
function App() {
  return (
   

    <Router>
    <Routes> 
      
    <Route exact path="/" element={<Home/>}/>
    {/* <Route path="/chat" element={<Chats/>}/>
    <Route path="/message/:chatId" element={<Chats/>}/> */}
    <Route path="/explore" element={<Explore/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
   </Routes>
  </Router>
  );
}

export default App;
