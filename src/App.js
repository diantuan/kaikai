

import SignUp from './components/sign-up/SignUp';
import Protected from './components/protected/Protected';
import Login from './components/login/Login';
import { AuthProvider } from './components/auth/Auth';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/notfound/NotFound';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element ={<Login/>}/>
          <Route path="/sign-up" element ={<SignUp/>}/>
          <Route path="/" element={<Protected/>}>
            
          </Route>
          <Route path="*" element = {<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
