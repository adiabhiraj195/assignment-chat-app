
import './App.css';
import LoginForm from './pages/(auth)/login';
import RegistrationForm from './pages/(auth)/register';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chats';

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='/register' Component={RegistrationForm}/>
        <Route path='/' Component={LoginForm}/>
        <Route path='/chats' Component={ChatPage}/>
      </Routes>
    </div>
  );
}

export default App;
