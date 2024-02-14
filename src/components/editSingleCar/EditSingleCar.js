import React, { useEffect, useState } from 'react'
import "../addNewCar/AddNewCar.scss";
import { useNavigate, useParams } from 'react-router';
import { EditCar } from '../../services/addNewCarService';
import { getSingleCar } from '../../services/carService';

const EditSingleCar = ({ activeUser }) => {
  const fuelOptions = ["","petrol", "diesel", "electric", "gas", "other"];
  const years = [""];
  const doors = ["", 3, 4, 5];
  const transmitions = ["", "Manual 4 gears", "Manual 5 gears", "Manual 6 gears", "Authomatic", "Semi-authomatic"];
  const car_body = ["", "Limuzina", "Hečbek", "Karavan", "Kupe", "Kabriolet/Roadster", "Monovolumen (MiniVan)", "Džip/SUV", "Pick up"];
  const replacement = ["", "Bez zamene", "Zamena za jeftinije", "U istoj ceni", "Zamena za skuplje", "Svejedno"];
  const drive = ["", "Prednji", "Zadnji", "4x4"];
  const seats = ["", "2 sedišta", "3 sedišta", "4 sedišta", "5 sedišta", "6 sedišta", "7 sedišta", "8 sedišta", "9 sedišta"];
  const wheel_side = ["", "Levi volan", "Desni volan"];
  const climatronic_options = ["", "Nema klime", "Manualna klima", "Automatska klima"];
  const colors = ["", "Bela", "Bež", "Bordo", "Braon", "Crna", "Crvena", "Kameleon", "Krem", "Ljubičasta", "Narandžasta", "Plava", "Siva", "Smeđa", "Srebrna", "Tirkiz", "Teget", "Zelena", "Zlatna", "Žuta"];

  for (let i = 1975; i <= 2022; i++) {
    years.push(i);
}

const { carId } = useParams()

const [car, setCar] = useState({})

useEffect(() => {
  if(carId) {
    const getCar = async () => {
      const {data} = await getSingleCar(carId);

      setNewCar({
        brand : data.brand,
        model: data.model,
        production_year: data.production_year,
        car_body : data.car_body,
        fuel: data.fuel,
        number_of_doors: data.number_of_doors,
        price : data.price,
        mileage : data.mileage,
        replacement : data.replacement,
        cubic_capacity : data.cubic_capacity,
        drive : data.drive,
        horse_power: data.horse_power,
        transmition: data.transmition,
        number_of_seats : data.number_of_seats,
        steering_wheel_side : data.steering_wheel_side,
        climatronic : data.climatronic,
        color : data.color,
        registered_until : data.registered_until,
        security : data.security,
        equipment : data.equipment,
        description: data.description,
        author: data.author,
        phone: data.phone,
        city: data.city
      })
  }

  getCar();
  }
}, [carId])

const navigate = useNavigate();

const [carImages, setCarImages] = useState(null)

const form = new FormData();

const onInputChange = (e) => {
  const arr = Array.from(e.target.files)
    setCarImages(arr)
}

const [newCar, setNewCar] = useState({})


const handleSubmit = async (e) => {
  e.preventDefault();
  
  form.set("brand", newCar.brand);
  form.set("model", newCar.model);
  form.set("production_year", newCar.production_year);
  form.set("car_body", newCar.car_body);
  form.set("fuel", newCar.fuel);
  form.set("number_of_doors", newCar.number_of_doors);
  form.set("price", newCar.price);
  form.set("mileage", newCar.mileage);
  form.set("replacement", newCar.replacement);
  form.set("cubic_capacity", newCar.cubic_capacity);
  form.set("drive", newCar.drive);
  form.set("horse_power", newCar.horse_power);
  form.set("transmition", newCar.transmition);
  form.set("number_of_seats", newCar.number_of_seats);
  form.set("steering_wheel_side", newCar.steering_wheel_side);
  form.set("climatronic", newCar.climatronic);
  form.set("color", newCar.color);
  form.set("registered_until", newCar.registered_until);
  form.set("security", newCar.security);
  form.set("equipment", newCar.equipment);
  form.set("description", newCar.description);
  form.set("author", activeUser.first_name);
  form.set("phone", activeUser.phone);
  form.set("city", activeUser.city);
  form.set("author_id", activeUser._id);

  if(carImages !== null) {
    for (let i = 0; i < carImages.length; i++) {
      const file = carImages[i];
      form.set("images", file)
    }
  }
  

  const data = await EditCar(form, carId)

  navigate("/cars")
}

if(!localStorage.getItem("user")) navigate("/login")

  return (
    <div className='add-car-form-container'>
        <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="add-car">
				<form onSubmit={handleSubmit} encType='multipart/form-data'>
        <span className='input-label'>Marka: </span>
					          <input 
                    type="text" 
                    value={newCar.brand}
                    name="brand" 
                    placeholder="Marka" 
                    required
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, brand : target.value })
                    }
                    />
                    {/* brand end */}

                    {/* model start */}
                    <span className='input-label'>Model: </span>
                    <input 
                    type="text" 
                    name="model"
                    value={newCar.model} 
                    placeholder="Model" 
                    required
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, model : target.value })
                    }
                    />
                    {/* model end */}

                    {/* year start */}
                    <span className='input-label'>Godina proizvodnje: </span>
                    <select
                    className="input" 
                    value={newCar.production_year}
                    required
                    name='production_year'
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
                    {/* year end */}

                    {/* car_body start */}
                    <span className='input-label'>Karoserija: </span>
                    <select
                    className="input" 
                    value={newCar.car_body}
                    name='car_body'
                    required
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, car_body : target.value })
                    }
                    >
                      {
                        car_body.map((item,index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                    </select>
                    {/* car_body end */}

                    {/* price start */}
                    <span className='input-label'>Cena: </span>
                    <input 
                    required
                    value={newCar.price}
                    type="text" 
                    name="price" 
                    placeholder="Cena"
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, price : target.value })
                    }
                    />
                    {/* price end */}

                    {/* mileage start */}
                    <span className='input-label'>Kilometraža: </span>
                    <input 
                    required
                    type="text" 
                    name="mileage" 
                    value={newCar.mileage}
                    placeholder="Kilometraža"
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, mileage : target.value })
                    }
                    />
                    {/* mileage end */}

                    {/* replacement start */}
                    <span className='input-label'>Zamena: </span>
                    <select
                    required
                    value={newCar.replacement}
                    className="input" 
                    name='replacement'
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, replacement : target.value })
                    }
                    >
                      {
                        replacement.map((item,index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                    </select>
                    {/* replacement end */}

                    {/* fuel start */}
                    <span className='input-label'>Vrsta goriva: </span>
                    <select
                    className="input" 
                    value={newCar.fuel}
                    name='fuel'
                    required
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
                    {/*  fuel end */}

                    {/* cubic_capacity start */}
                    <span className='input-label'>Kubikaža: </span>
                    <input 
                    type="text" 
                    value={newCar.cubic_capacity}
                    name="cubic_capacity" 
                    placeholder="Kubikaža" 
                    required 
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, cubic_capacity : target.value })
                    }
                    />
                    {/* cubic_capacity end */}

                    {/* doors start */}
                    <span className='input-label'>Broj vrata: </span>
                    <select
                    className="input" 
                    value={newCar.number_of_doors}
                    name='number_of_doors'
                    required
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
                    {/* doors end */}

                    {/* horse_power start */}
                    <span className='input-label'>Konjske snage: </span>
                    <input 
                    type="text" 
                    value={newCar.horse_power}
                    name="horse_power" 
                    placeholder="Snaga motora(konjske snage)" 
                    required
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, horse_power : target.value })
                    }
                    />
                    {/* horse_power end */}

                    {/* drive (pogon) start */}
                    <span className='input-label'>Pogon: </span>
                      <select
                        className="input" 
                        value={newCar.drive}
                        name='drive'
                        required
                        onChange={({ target }) =>
                        setNewCar({ ...newCar, drive : target.value })
                        }
                        >
                          {
                            drive.map((item,index) => (
                              <option key={index} value={item}>{item}</option>
                            ))
                          }
                      </select>
                    {/* drive (pogon) end */}

                    {/* transmition start */}
                    <span className='input-label'>Menjač: </span>
                    <select
                    value={newCar.transmition}
                    className="input" 
                    name='transmition'
                    required
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
                    {/* transmition end */}

                    {/* number_of_seats start */}
                    <span className='input-label'>Broj sedišta: </span>
                    <select
                    className="input" 
                    value={newCar.number_of_seats}
                    name='number_of_seats'
                    required
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, number_of_seats : target.value })
                    }
                    >
                      {
                        seats.map((item,index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                    </select>
                    {/* number_of_seats end end */}

                    {/* steering_wheel_side start */}
                    <span className='input-label'>Strana volana: </span>
                    <select
                    className="input" 
                    value={newCar.steering_wheel_side}
                    name='steering_wheel_side'
                    required
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, steering_wheel_side : target.value })
                    }
                    >
                      {
                        wheel_side.map((item,index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                    </select>
                    {/* steering_wheel_side end */}

                    {/* climatronic start */}
                    <span className='input-label'>Klima: </span>
                    <select
                    value={newCar.climatronic}
                    className="input" 
                    name='climatronic'
                    required
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, climatronic : target.value })
                    }
                    >
                      {
                        climatronic_options.map((item,index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                    </select>
                    {/* climatronic end */}

                    {/* color start */}
                    <span className='input-label'>Boja vozila: </span>
                    <select
                    value={newCar.color}
                    className="input" 
                    name='color'
                    required
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, color : target.value })
                    }
                    >
                      {
                        colors.map((item,index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                    </select>
                    {/* color end */}

                    {/* registered_until start */}
                    {/* <span className='input-label'>Registrovan do: </span>
                    <input 
                    type='date' 
                    name="registered_until" 
                    placeholder="Registrovan do" 
                    // required 
                    className="input" 
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, registered_until : target.value })
                    }
                    /> */}
                    {/* registered_until end */}

                    {/* description start */}
                    <span className='input-label'>Opis: </span>
                    <textarea 
                    className='input' 
                    value={newCar.description}
                    required
                    placeholder='Opis'
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, description : target.value })
                    }
                    ></textarea>
                    {/* description end */}
					<button type='submit' className='btn--add'>Edit</button>
				</form>
			</div>
	</div>
    </div>
  )
}

export default EditSingleCar