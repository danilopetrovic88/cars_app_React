import React, { useEffect, useState } from 'react'
import "../appCars/AppCars.scss";
import { getAllCars } from '../../services/carService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SingleAuthorCars = () => {
    const [cars, setCars] = useState([]);
    const {authorId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getCars = async () => {
            const {data} = await getAllCars()
            const authorsCars = data && data.filter((car) => car.author_id === authorId)
            setCars(authorsCars);
        }
        getCars()
    }, [])

    const author = cars.filter((car) => car.author_id === authorId)

  return (
    <>
        <h1>Pogledaj sve oglase prodavca { author.length && author[0].author } </h1>
        <div className='cars-container'>
            {
                cars && 
                cars.map((car,index) => (
                    <Link to={`/cars/${car._id}`} key={index} className='card'>
                        <div className='card__image'>
                        <img src={`http://localhost:8000/` + car.images[0].path} alt='Car image' />
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