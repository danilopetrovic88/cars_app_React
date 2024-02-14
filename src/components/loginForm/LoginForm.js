import React, { useState } from 'react'
import "./LoginForm.scss";
import { loginUser } from '../../services/authService';
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();

      const [credentialsLogin, setCredentialsLogin] = useState({
        email: "",
        password: ""
      });

      const [errors, setErrors] = useState(null)

      const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const activeUser = await loginUser(credentialsLogin); 

        if(activeUser) {
          localStorage.removeItem("loginError")
          setErrors(null)
          JSON.parse(localStorage.setItem("user", activeUser));
        }
        if(localStorage.getItem("loginError")) {
          setCredentialsLogin({
            email: "",
            password: ""
          })
          let err = JSON.parse(localStorage.getItem("loginError"))
          if(err) setErrors(err)
          localStorage.removeItem("loginError")
        }


        setCredentialsLogin({
          email: "",
          password: ""
        })

      
          if(localStorage.getItem("user")) {
            localStorage.removeItem("loginError")
            setErrors(null)
            navigate("/cars")
          }
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
                    value={credentialsLogin.email}
                    onChange={({ target }) =>
                    setCredentialsLogin({ ...credentialsLogin, email: target.value })
                    }
                    />
					<input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required='' 
                    value={credentialsLogin.password}
                    onChange={({ target }) =>
                    setCredentialsLogin({ ...credentialsLogin, password: target.value })
                    }
                    />
					<button>Login</button>

          {
            errors && 
            <>
              <button className='btn--error'>{ errors.error }</button>
              <Link className='btn--register' to={"/register"}>Register</Link>
            </>
          }
				</form>
			</div>
	</div>
    </div>
  )
}

export default LoginForm