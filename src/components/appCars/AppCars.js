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

  return (
    <>
        {/* <h1>Gallery</h1> */}
        <div className='cars-container'>
            {
                cars.length !== 0 &&
                cars.map((car,index) => (
                    <div className='card-container'>
                    <div className='card__footer'>
                            <h3>{ car.brand + " " + car.model }</h3>
                    </div>
                    <Link to={`/cars/${car._id}`} key={index} className='card'>
                        <div className='card__image'>
                            <img className='card__image__background' src={car.images.length && `http://localhost:8000/` + car.images[0].path} alt='Car image' />
                        </div>
                    </Link>
                    </div>
                )) 
            }

            {
                cars.length === 0 && <h1>Nema oglasa!</h1>
            }
        </div>
        <button onClick={() => navigate("/")} class="close btn--back">
        <p>Back</p>
    </button>
    </>
  )
}

export default AppCars
