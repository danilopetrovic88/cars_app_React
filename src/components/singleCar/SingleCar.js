import React, { useEffect, useState } from 'react'
import "./SingleCar.scss";
import { useNavigate, useParams } from 'react-router'
import { deleteCar, getSingleCar } from '../../services/carService';
import { Link } from 'react-router-dom';

const SingleCar = ({ activeUser }) => {
    const { carId }  = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState({});

    useEffect(() => {
        const getCar = async () => {
            const {data} = await getSingleCar(carId);

            setCar(data);
        }

        getCar();
    }, [carId])

    const handleDeleteCar = async (carId) => {
      const data = await deleteCar(carId)

      navigate("/cars")
    }

  return (
    <div className='single-car'>
      <div className="flip-card-container" style={{"--hue": "220"}}>
        <div className="flip-card">

          <div className="card-front">
            <ul className='single-car__list'>
              <div>
                <li className='single-car__list-item'>Marka: {car.brand}</li>
                <li className='single-car__list-item'>Model: {car.model}</li>
                <li className='single-car__list-item'>Godina proizvodnje: {car.production_year}</li>
                <li className='single-car__list-item'>Šasija: {car.car_body}</li>
                <li className='single-car__list-item'>Gorivo: {car.fuel}</li>
                <li className='single-car__list-item'>Broj vrata: {car.number_of_doors}</li>
                <li className='single-car__list-item'>Mesto: {car.city}</li>
                <li className='single-car__list-item'>Kilometraža: {car.mileage}</li>
                <li className='single-car__list-item'>Zamena: {car.replacement}</li>
              </div>
              <div>
                <li className='single-car__list-item'>Kubikaža: {car.cubic_capacity}</li>
                <li className='single-car__list-item'>Snaga: {car.horse_power} konja</li>
                <li className='single-car__list-item'>Pogon: {car.drive}</li>
                <li className='single-car__list-item'>Menjač: {car.transmition}</li>
                <li className='single-car__list-item'>Broj sedišta: {car.number_of_seats}</li>
                <li className='single-car__list-item'>Volan: {car.steering_wheel_side}</li>
                <li className='single-car__list-item'>Klima: {car.climatronic}</li>
                <li className='single-car__list-item'>Boja: {car.color}</li>
                <li className='single-car__list-item'>Cena: {car.price} €</li>
              </div>
            </ul>

              <div className='card-front__footer'>

                <p className='single-car__description'>OPIS: {car.description}</p>

                <div className='btn-container'>
                  <Link to={`/cars/${carId}/gallery`} className='btn--card btn--card-responsive'>Pogledaj slike</Link>
                  <Link className='btn--card btn--card-responsive' to={`/cars/author/${car.author_id}`}>Svi oglasi</Link>
                  <button className='btn btn--phone'>{ car.phone }</button>
                </div>

                { activeUser && activeUser._id === car.author_id ?
                <div className='btn-container'>
                    <Link className='btn--card btn--edit' to={`/cars/edit/${car._id}`}>Edit</Link> 
                    <button 
                    className='btn--card btn--delete'
                    onClick={() => handleDeleteCar(car._id)}
                    >Delete</button>
                </div>
                : ''}

                <div className="design-container">
                  <span className="design design--1"></span>
                  <span className="design design--2"></span>
                  <span className="design design--3"></span>
                  <span className="design design--4"></span>
                  <span className="design design--5"></span>
                  <span className="design design--6"></span>
                  <span className="design design--7"></span>
                  <span className="design design--8"></span>
                </div>
            </div>
          </div>

          
        </div>
      </div>
      <button onClick={() => navigate("/cars")} class="close btn--back">
        <p>Back</p>
    </button>
    </div>
  )
}

export default SingleCar