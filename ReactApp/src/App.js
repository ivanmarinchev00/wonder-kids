import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import ArticleComponent from "./Components/ArticleComponent.js"
import ChatComponent from "./Components/ChatComponent.js"
import ConversationsComponent from "./Components/ConversationsComponent.js"
import GameComponent from "./Components/GameComponent.js"
import LoginComponent from "./Components/LoginComponent.js"
import RegisterComponent from "./Components/RegisterComponent.js"
import MenuComponent from './Components/MenuComponent';


function App() {
  return (
    
    <Router >
    <Route exact path ="/">
    <LoginComponent />
    </Route> 
    <Route path="/menu">
    <MenuComponent/>
    </Route>
    <Route path = "/chat">
      <ChatComponent/>
    </Route>
    <Route path ="/conversations">
    <ConversationsComponent/>
    </Route> 
    <Route path ="/game">
    <GameComponent/>
    </Route> 
    <Route path ="/articles" >
    <ArticleComponent />
    </Route> 
    <Route path = "/register">
    <RegisterComponent/>
    </Route> 
  </Router>

  );
}

export default App;
