import React, { useEffect, useState } from 'react'
import "../appCars/AppCars.css";
import { getAllCars } from '../../services/carService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SingleAuthorCars = () => {
    const [cars, setCars] = useState([]);
    const {authorId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getCars = async () => {
            const {data} = await getAllCars()
            const authorsCars = data && data.filter((car) => car.author._id === authorId)
            console.log("AUTHORSCARS: ", authorsCars)
            setCars(authorsCars);
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
                            <img src={ car.images[0].url } />
                        </div>
                        <div className='card__footer'>
                            <h3>{ car.brand + " " + car.model }</h3>
                            
                        </div>
                    </Link>
                ))
            }
        </div>
        <button onClick={() => navigate("/cars")} class="close btn--back">
        <p>Back</p>
    </button>
    </>
  )
}

export default SingleAuthorCars