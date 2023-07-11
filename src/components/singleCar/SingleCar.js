import React, { useEffect, useState } from 'react'
import "./SingleCar.css";
import { Route, Routes, useNavigate, useParams } from 'react-router'
import { getSingleCar } from '../../services/carService';
import { Link } from 'react-router-dom';

const SingleCar = () => {
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

    if(!localStorage.getItem("user")) navigate("/login")

  return (
    <div className='single-car'>
      <div className="flip-card-container" style={{"--hue": "220"}}>
        <div className="flip-card">

          <div className="card-front">
            <figure>
              <div className="img-bg"></div>
              <img className='card-img card-front-img' src={car.images && car.images[0].url} alt={car.brand} />
              <figcaption>{car.brand + " " + car.model}</figcaption>
            </figure>


            <div class="div main-div">
              <div class="first">H</div>
              <div class="second">O</div>
              <div class="third">V</div>
              <div class="forth">E</div>
              <div class="first">R</div>
              {" " + " " + " "}
              <div class="forth">M</div>
              <div class="first">E</div>
          </div>



            <ul className='single-car__list'>
              <li className='single-car__list-item'>Production year: {car.production_year}</li>
              <li className='single-car__list-item'>Country: {car.country_of_origin}</li>
              <li className='single-car__list-item'>Fuel: {car.fuel}</li>
              <li className='single-car__list-item'>Number of doors: {car.number_of_doors}</li>
              <li className='single-car__list-item'>Engine: {car.engine}</li>
              <li className='single-car__list-item'>Horse power: {car.horse_power}</li>
              <li className='single-car__list-item'>Transmition: {car.transmition}</li>
            </ul>
          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
              <img className='card-img card-back-img' src={car.images && car.images[0].url} alt="Brohm Lake" />
            </figure>

            <p className='single-car__description'>{car.description}</p>

            <Link to={`/cars/${carId}/gallery`} className='btn--card'>SEE GALLERY</Link>

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
      <button onClick={() => navigate("/cars")} class="close btn--back">
        <p>Back</p>
    </button>
    </div>
  )
}

export default SingleCar