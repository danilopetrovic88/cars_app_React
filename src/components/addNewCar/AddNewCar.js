import React, { useState } from 'react'
import "./AddNewCar.css";
import { addNewCar } from '../../services/carService';
import { useNavigate } from 'react-router';

const AddNewCar = ({ activeUser }) => {
  const fuelOptions = ["","petrol", "diesel", "electric", "gas", "other"];
  const years = [];
  const doors = ["", 3, 4, 5];
  const transmitions = ["", "Manual 4 gears", "Manual 5 gears", "Manual 6 gears", "Authomatic", "Semi-authomatic"];

  for (let i = 1975; i <= 2022; i++) {
    years.push(i);
}

const navigate = useNavigate();

const [newCar, setNewCar] = useState({
    brand : "",
    model: "",
    production_year: "",
    country_of_origin: "",
    fuel: "",
    number_of_doors: "",
    engine: "",
    horse_power: "",
    transmition: "",
    description: "",
    images: [],
    author : {}
})

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = await addNewCar({
    ...newCar,
    author : {
      _id: activeUser._id,
      first_name: activeUser.first_name,
      last_name: activeUser.last_name,
      email: activeUser.email
    }
  });

  setNewCar({
    brand : "",
    model: "",
    production_year: "",
    country_of_origin: "",
    fuel: "",
    number_of_doors: "",
    engine: "",
    horse_power: "",
    transmition: "",
    description: "",
    images: [],
    author: {}
  })

  navigate("/cars")
}
const [ input, setInput ] = useState([''])

if(!localStorage.getItem("user")) navigate("/login")

  return (
    <div className='add-car-form-container'>
        <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="add-car">
				<form onSubmit={handleSubmit}>
					{/* <h2 className='add-car-title'>Add new car</h2> */}
					          <input 
                    type="text" 
                    name="brand" 
                    placeholder="Brand" 
                    required='' 
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, brand : target.value })
                    }
                    />
                    <input 
                    type="text" 
                    name="model" 
                    placeholder="Model" 
                    required='' 
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, model : target.value })
                    }
                    />
                    <span className='input-label'>Year: </span>
                    <select
                    className="input" 
                    name='production_year'
                    // value={newCar.year}
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, production_year : target.value })
                    }
                    >
                      {
                        years.map((year,index) => (
                          <option key={index} value={year}>{year}</option>
                        ))
                      }
                    </select>
                    <input 
                    type="text" 
                    name="country_of_origin" 
                    placeholder="Country of origin" 
                    required='' 
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, country_of_origin : target.value })
                    }
                    />
                    <span className='input-label'>Fuel: </span>
                    <select
                    className="input" 
                    name='fuel'
                    // value={newCar.fuel}
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, fuel : target.value })
                    }
                    >
                      {
                        fuelOptions.map((option,index) => (
                          <option key={index}>{option}</option>
                        ))
                      }
                    </select>
                    <input 
                    type="text" 
                    name="engine" 
                    placeholder="Engine name" 
                    required='' 
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, engine : target.value })
                    }
                    />
                    <span className='input-label'>Doors: </span>
                    <select
                    className="input" 
                    name='number_of_doors'
                    // value={newCar.number_of_doors}
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, number_of_doors : target.value })
                    }
                    >
                      {
                        doors.map((door,index) => (
                          <option key={index}>{door}</option>
                        ))
                      }
                    </select>
                    <input 
                    type="text" 
                    name="horse_power" 
                    placeholder="Horse power" 
                    required='' 
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, horse_power : target.value })
                    }
                    />
                    <span className='input-label'>Transmition: </span>
                    <select
                    className="input" 
                    name='transmition'
                    // value={newCar.transmition}
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, transmition : target.value })
                    }
                    >
                      {
                        transmitions.map((transmition,index) => (
                          <option key={index} value={transmition}>{transmition}</option>
                        ))
                      }
                    </select>
                    <textarea 
                    className='input' 
                    placeholder='Something about car'
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, description : target.value })
                    }
                    ></textarea>

                    {
                      input.map((i, index) => (
                        <input 
                        key={index}
                        type="text" 
                        placeholder='Image url...' 
                        name='images' 
                        className="input"
                        onChange={({target}) => setNewCar(
                            {
                                ...newCar,
                                images: [ 
                                    ...newCar.images,
                                    {
                                        url: target.value
                                    }
                                ]
                            }
                        )}
                        />
                      ))
                    }
                        <button type='button' className="add-btn" onClick={() => setInput([...input, ''])}>
                          Add another image
                        </button>
					<button type='submit' className='btn--add'>Add</button>
				</form>
			</div>
	</div>
    </div>
  )
}

export default AddNewCar