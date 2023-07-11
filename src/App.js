import './App.css';
import { Link, Switch, Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppCars from './components/appCars/AppCars';
import SingleCar from './components/singleCar/SingleCar';
import HomePage from './components/homePage/HomePage';
import { faCar, faCoffee, faTruckLoading } from '@fortawesome/fontawesome-free-solid';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/loginForm/LoginForm';
import SingleCarGallery from './components/singleCar/SingleCarGallery';
import AddNewCar from './components/addNewCar/AddNewCar';
import { useEffect, useState } from 'react';
import { getUser, logoutUser } from './services/authService';
import SingleAuthorCars from './components/singleAuthorCars/SingleAuthorCars';

function App() {

  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState(undefined);

  useEffect(() => {
    const user = getUser();
    if(user) {
      setActiveUser(user);
    }
  }, [localStorage.getItem("user")])

  const handleLogout = () => {
    logoutUser();
    setActiveUser(undefined)
    if(activeUser === undefined) {
      navigate("/");
    }
  }

  console.log("ACTIVE USER/ App.js: ", activeUser)

  return (
    <>
      <nav className='navbar'>
      <Link className='navbar__logo' to={"/"}>
        <h1>Cars Application</h1>
        <FontAwesomeIcon icon={faCar} />
      </Link>
        <ul className='navbar__items'>
          {
            localStorage.getItem("user") &&
            <li className='navbar__item'>
            <Link to={"/cars"}>All Cars</Link>
            </li>
          }
          {
            localStorage.getItem("user") && 
            <li className='navbar__item'>
            <Link to={"/add-new-car"}>Add new car</Link>
            </li>
          }
          {
            !localStorage.getItem("user") && 
            <>
              <li className='navbar__item'>
                <Link to={"/login"}>Login</Link>
              </li>
              <li className='navbar__item'>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          }
          {
            localStorage.getItem("user") && 
            <button className='navbar__item' onClick={() => handleLogout()}>Logout</button>
          }
        </ul>
      </nav>
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<HomePage activeUser={activeUser} />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path="/cars" exact element={<AppCars />} />
          <Route path="/cars/author/:authorId" exact element={<SingleAuthorCars />} />
          <Route path="/cars/:carId" exact element={<SingleCar />} />
          <Route path="/cars/:carId/gallery" exact element={<SingleCarGallery />} />
          <Route path="/add-new-car" exact element={<AddNewCar activeUser={activeUser} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
