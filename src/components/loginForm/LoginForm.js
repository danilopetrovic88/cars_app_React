import React, { useState } from 'react'
import "./LoginForm.css";
import { loginUser } from '../../services/authService';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

    const navigate = useNavigate();

      const [credentialsLogin, setCredentialsLogin] = useState({
        email: "",
        password: ""
      });

      const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const activeUser = await loginUser(credentialsLogin); 

        if(activeUser) {
         JSON.parse(localStorage.setItem("user", activeUser));
        }

        setCredentialsLogin({
          email: "",
          password: ""
      })
          navigate("/cars")
      }


  return (
    <div className='form-container'>
        <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="login">
				<form onSubmit={handleSubmitLogin}>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    required='' 
                    onChange={({ target }) =>
                    setCredentialsLogin({ ...credentialsLogin, email: target.value })
                    }
                    />
					<input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required='' 
                    onChange={({ target }) =>
                    setCredentialsLogin({ ...credentialsLogin, password: target.value })
                    }
                    />
					<button>Login</button>
				</form>
			</div>
	</div>
    </div>
  )
}

export default RegisterForm