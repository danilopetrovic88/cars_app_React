import React, { useEffect, useState } from 'react'
import "./AppCars.css";
import { getAllCars } from '../../services/carService';
import { Link, useNavigate } from 'react-router-dom';

const AppCars = () => {
    const [cars, setCars] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getCars = async () => {
            const {data} = await getAllCars()

            setCars(data);
        }
        getCars()
    }, [])

    if(!localStorage.getItem("user")) navigate("/login")


  return (
    <>
        <h1>Gallery</h1>
        <div className='cars-container'>
            {
                cars && 
                cars.map((car,index) => (
                    <Link to={`/cars/${car._id}`} key={index} className='card'>
                        <div className='card__image'>
                            <img src={ car.images.length && car.images[0].url } />
                        </div>
                        <div className='card__footer'>
                            <h3>{ car.brand + " " + car.model }</h3>
                            
                        </div>
                        <Link to={`/cars/author/${car.author._id}`} className='btn authors-cars'>
                            All my cars:    { car.author.first_name }
                        </Link>
                    </Link>
                ))
            }
        </div>
        <button onClick={() => navigate("/")} class="close btn--back">
        <p>Back</p>
    </button>
    </>
  )
}

export default AppCars