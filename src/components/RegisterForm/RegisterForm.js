import React, { useState } from 'react'
import "./RegisterForm.css";
import { registerUser } from '../../services/authService';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

    const navigate = useNavigate();

    const [credentialsRegister, setCredentialsRegister] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        city: ""
      });

      const [errors, setErrors] = useState(null)

      const handleSubmitRegister = async (e) => {
        e.preventDefault();

        if(localStorage.getItem("registerError")) {
            let err = JSON.parse(localStorage.getItem("registerError"))
            if(err) {
                setErrors(err)
            }
            setCredentialsRegister({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                phone: "",
                city: ""
            })
      }
      localStorage.removeItem("registerError")
      const data = await registerUser(credentialsRegister);

      if(data) {
        navigate('/login');
      }
    }


  return (
    <div className='form-container'>
        <div class="mainRegister">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div class="signup">
				<form onSubmit={handleSubmitRegister}>
					<label for="chk" aria-hidden="true">Registruj se</label>
					<input 
                    type="text" 
                    name="first_name" 
                    placeholder="Vaše ime" 
                    required
                    value={credentialsRegister.first_name} 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, first_name: target.value })
                    }
                    />
                    <input 
                    type="text" 
                    name="last_name" 
                    placeholder="Prezime" 
                    required 
                    value={credentialsRegister.last_name} 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, last_name: target.value })
                    }
                    />
					<input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    required 
                    value={credentialsRegister.email} 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, email: target.value })
                    }
                    />
					<input 
                    type="password" 
                    name="password" 
                    placeholder="Šifra" 
                    required 
                    value={credentialsRegister.password} 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, password: target.value })
                    }
                    />
                    <input 
                    type="text" 
                    name="phone" 
                    placeholder="Broj mobilno telefona" 
                    required 
                    value={credentialsRegister.phone} 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, phone: target.value })
                    }
                    />
                    <input 
                    type="text" 
                    name="city" 
                    placeholder="Grad" 
                    required 
                    value={credentialsRegister.city} 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, city: target.value })
                    }
                    />
					<button>Registruj se</button>
				</form>
                {
                    errors && <button className='register-error btn--error'>{ errors.error }</button>
                }
			</div>
	</div>
    </div>
  )
}

export default RegisterForm