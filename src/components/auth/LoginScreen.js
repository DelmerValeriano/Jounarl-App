import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";


export const LoginScreen = () => {

  const dispatch=  useDispatch();
   const {loading} = useSelector(state=>state.ui);

  const [formValue,handleInputChange]= useForm({
      email: 'delmer_valeriano@yahoo.com',
      password: '123456'
  });

  const {email,password} = formValue;


  const hadnleSumbmit =(e)=>{
    e.preventDefault();
    dispatch( startLoginEmailPassword(email,password) );

  }
  const handleGooogleLogin=()=>{
    dispatch(startGoogleLogin());
  }




  return (
    <>
      <form onSubmit={hadnleSumbmit} className="animate__animated animate__fadeIn animete_faster">
        <h3 className="auth__title">Login</h3>
        <input 
          className="auth__input" 
          type="text" 
          placeholder="Email" 
          autoComplete="off" 
          name="email" 
          value={email} 
          onChange={handleInputChange}        

        />
          
        <input  
          className="auth__input" 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={password}
          onChange={handleInputChange}
        />

        <button className="btn btn-primary btn-block" disabled={ loading } type="submit">Login</button>
       
        <div className="auth__socialnetworks">
          <p>Login with social network</p>
          <div className="google-btn" onClick={handleGooogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create a new account

        </Link>
      </form>
    </>
  );
};
