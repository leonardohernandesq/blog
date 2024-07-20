import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

  }, [auth])

  if(loadingUser){ 
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About />}/>
              <Route path='/search' element={<Search />}/>
              <Route path='/posts/:id' element={<Post />}/>
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />}/>
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />}/>
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />}/>
              <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/login" />}/>
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
