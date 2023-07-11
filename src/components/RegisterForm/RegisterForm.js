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
        password: ""
      });

      const handleSubmitRegister = async (e) => {
        e.preventDefault();

        const data = await registerUser(credentialsRegister);

        setCredentialsRegister({
            first_name: "",
            last_name: "",
            email: "",
            password: ""
          })
          navigate('/login');
      }


  return (
    <div className='form-container'>
        <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div class="signup">
				<form onSubmit={handleSubmitRegister}>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input 
                    type="text" 
                    name="first_name" 
                    placeholder="First name" 
                    required='' 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, first_name: target.value })
                    }
                    />
                    <input 
                    type="text" 
                    name="last_name" 
                    placeholder="Last name" 
                    required='' 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, last_name: target.value })
                    }
                    />
					<input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    required='' 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, email: target.value })
                    }
                    />
					<input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required='' 
                    onChange={({ target }) =>
                    setCredentialsRegister({ ...credentialsRegister, password: target.value })
                    }
                    />
					<button>Sign up</button>
				</form>
			</div>
	</div>
    </div>
  )
}

export default RegisterForm