 import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch,useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegistes } from '../../actions/auth';


 
 export const RegisterScreen = () => {

    const dispatch =useDispatch();

    const {msgError} = useSelector(state=>state.ui)
   


    const [formValue,handleInputChange] = useForm({
      name:'Delmer',
      email: 'delmer_valeriano@yahoo.com',
      password: '123456',
      password2: '123456'
    });

    const {name,email,password,password2} =formValue;


    const hadleRegisterer =(e)=>{
      e.preventDefault();
        if (isFormValid()) {
          dispatch(startRegistes(email,password,name,password2));
          
        }
    }

    const isFormValid = ()=>{
      if (name.trim().length===0) {
        dispatch(setError('Nombre es requerido'));
        
        return false;
      }else if(!validator.isEmail(email)){
        dispatch(setError('Email incorrecto'));
        return false;
      }else if(password!==password2 || password.length <5){
        dispatch(setError('contraseña no son iguales'));
        return false;
      }

        dispatch(removeError());



      return true;
    }



   return (
    <>
    <form onSubmit={hadleRegisterer} className="animate__animated animate__fadeIn animete_faster">

      {
        msgError &&
        (<div className="auth__alert-error">
         {msgError}
        </div>)
      }


      <h3 className="auth__title">Register</h3>
      <input className="auth__input" type="text" onChange={handleInputChange}  value={ name}placeholder="Name" autoComplete="off" name="name" />

      <input className="auth__input" type="text"onChange={handleInputChange}  value={email}placeholder="Email" autoComplete="off" name="email" />
      <input className="auth__input" type="password" onChange={handleInputChange} value={password}placeholder="Password" name="password" />
      <input className="auth__input" type="password"onChange={handleInputChange}  value={password2}placeholder="Confirm Password" name="password2" />

      <button className="btn btn-primary btn-block mb-5"  type="submit">Register</button>
   

      <Link className="link mt-5" to="/auth/login">
        Already Registered?
      </Link>
    </form>
  </>
   )
 }
 