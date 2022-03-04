import {types} from '../types/types';
import { googleProvider} from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';



export const startLoginEmailPassword=(email,password) => {
    //lo que regresa esta funcion es un coullback
    return (dispatch)=>{

        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
            .then( ({ user }) => {
                 dispatch(login(user.uid,user.displayName))
                 dispatch(finishLoading());
            })  .catch (e=>{
                dispatch(finishLoading());
                Swal.fire('Error','Correo o Contraseña Incorrctos','error');

              
            })
            

    }

}

export const startRegistes=(email,password,name) => {
    return(dispatch)=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async({ user }) => {

             await updateProfile( user, { displayName: name });
             dispatch(login(user.uid, user.displayName))

            })
            .catch (e=>{
                console.log(e);
                Swal.fire('Error','usuario  ya registrado','error');

            })
    }

}



export const startGoogleLogin=( )=> {

    return (dispatch) =>{
        const auth = getAuth();
 
        signInWithPopup(auth, googleProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
                
                
            });
    }
}




export const login =(uid,displayName) =>( {
        type: types.login,
        payload: {
            uid,
            displayName

        }
        
});


export const startLogout=()=>{
    return async(dispatch)=>{
        const auth = getAuth();
        await signOut(auth);

        dispatch(logout());
        dispatch(noteLogout());
    }
}


export const logout =()=>({ 
    type:types.logout,
})


