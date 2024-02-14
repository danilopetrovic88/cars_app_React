import React, { useEffect, useState } from 'react'
import "./SingleCarGallery.scss";
import { useNavigate, useParams } from 'react-router';
import { getSingleCar } from '../../services/carService';

const SingleCarGallery = () => {

    const navigate = useNavigate();

    const { carId }  = useParams();

    const [car, setCar] = useState({});

    useEffect(() => {
        const getCar = async () => {
            const {data} = await getSingleCar(carId);

            setCar(data);
        }

        getCar();
    }, [carId])

    // if(!localStorage.getItem("user")) navigate("/login")

  return (
    <>

<div class="container">
  {
    car.images && car.images.map((image, index) => (
        <div class="card">
            <img src={`http://localhost:8000/` + image.path} />
        <div class="card__head">
            {
                car.brand + " " + car.model
            }
        </div>
  </div>
    ))
  }
</div>

    <button onClick={() => navigate(-1)} class="close btn--back">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <svg viewBox="0 0 36 36" class="circle">
            <path
            stroke-dasharray="100, 100"
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
        </svg>
    </button>
    </>
  )
}

export default SingleCarGallery