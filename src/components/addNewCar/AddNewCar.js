import React, { useEffect, useState } from 'react'
import "./AddNewCar.css";
import { useNavigate } from 'react-router';
import { addNewCarService } from '../../services/addNewCarService';
import { carBrands } from '../../services/carBrands';

const AddNewCar = ({ activeUser }) => {
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

  useEffect(() => {
    setBrands(carBrands)
  }, [])

const navigate = useNavigate();

const [brands, setBrands] = useState([""])
const [brand, setBrand] = useState("");


const filteredBrand = brands.filter(item => item.brand === brand);

const [newCar, setNewCar] = useState({
    brand : "",
    model: "",
    production_year: "",
    car_body : "",
    fuel: "",
    number_of_doors: "",
    price : "",
    mileage : "",
    replacement : "",
    cubic_capacity : "",
    drive : "",
    horse_power: "",
    transmition: "",
    number_of_seats : "",
    steering_wheel_side : "",
    climatronic : "",
    color : "",
    registered_until : "",
    security : [],
    equipment : [],
    description: "",
    author: "",
    phone: "",
    city: ""
})

const [carImages, setCarImages] = useState(null)

const form = new FormData();

const onInputChange = (e) => {
  const arr = Array.from(e.target.files)
    setCarImages(arr)
}



const handleSubmit = async (e) => {
  e.preventDefault();
  
  form.append("brand", newCar.brand);
  form.append("model", newCar.model);
  form.append("production_year", newCar.production_year);
  form.append("car_body", newCar.car_body);
  form.append("fuel", newCar.fuel);
  form.append("number_of_doors", newCar.number_of_doors);
  form.append("price", newCar.price);
  form.append("mileage", newCar.mileage);
  form.append("replacement", newCar.replacement);
  form.append("cubic_capacity", newCar.cubic_capacity);
  form.append("drive", newCar.drive);
  form.append("horse_power", newCar.horse_power);
  form.append("transmition", newCar.transmition);
  form.append("number_of_seats", newCar.number_of_seats);
  form.append("steering_wheel_side", newCar.steering_wheel_side);
  form.append("climatronic", newCar.climatronic);
  form.append("color", newCar.color);
  form.append("registered_until", newCar.registered_until);
  form.append("security", newCar.security);
  form.append("equipment", newCar.equipment);
  form.append("description", newCar.description);
  form.append("author", activeUser.first_name);
  form.append("phone", activeUser.phone);
  form.append("city", activeUser.city);
  form.append("author_id", activeUser._id);

  if(carImages !== null) {
    for (let i = 0; i < carImages.length; i++) {
      const file = carImages[i];
      form.append("images", file)
    }
  }
  

  const data = await addNewCarService(form)

  navigate("/cars")
}

if(brands[0] !== "") {
  brands.unshift("")
}

if(filteredBrand[0] && filteredBrand[0].models[0] !== "") {
  filteredBrand[0].models.unshift("")
}

if(!localStorage.getItem("user")) navigate("/login")

console.log("BRANDS: ", newCar)


  return (
    <div className='add-car-form-container'>
        <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="add-car">
				<form onSubmit={handleSubmit} encType='multipart/form-data'>

                    {/* brand list start */}
                    <span className='input-label'>Brand: </span>
                    <select
                    className="input" 
                    required
                    name='brand'
                    onChange={({ target }) => {
                      setBrand(target.value)
                      setNewCar({ ...newCar, brand : target.value })
                    }
                    }
                    >
                      {
                        brands && brands.map((brand,index) => (
                          <option key={index} value={brand.brand}>{brand.brand}</option>
                        ))
                      }
                    </select>
                    {/* brand list end */}

                    {/* models list start */}
                    <span className='input-label'>Model: </span>
                    <select
                    className="input" 
                    required
                    name='model'
                    onChange={({ target }) => {
                      setNewCar({ ...newCar, model : target.value })
                    }
                    
                    }
                    >
                      {
                        filteredBrand[0] && filteredBrand[0].models.map((model,index) => (
                          <option key={index} value={model}>{model}</option>
                        ))
                      }
                    </select>
                    {/* models list end */}


                    {/* year start */}
                    <span className='input-label'>Godina proizvodnje: </span>
                    <select
                    className="input" 
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
                    required
                    placeholder='Opis'
                    onChange={({ target }) =>
                    setNewCar({ ...newCar, description : target.value })
                    }
                    ></textarea>
                    {/* description end */}

                    {/* images start */}
                    <span className='input-label'>Dodaj slike: </span>
                    {
                        <input 
                        type='file' 
                        multiple
                        required
                        placeholder='Dodaj sliku' 
                        name='images' 
                        className="input"
                        onChange={(e) => onInputChange(e)}
                        />
                    }
                    {/* images end */}
					<button type='submit' className='btn--add'>Add</button>
				</form>
			</div>
	</div>
    </div>
  )
}

export default AddNewCar