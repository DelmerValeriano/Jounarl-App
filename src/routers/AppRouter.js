import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { login } from '../actions/auth';
import { StartLoadingNotes } from '../actions/notes';

import { JournalScreen } from '../components/journal/JournalScreen';
import { firebaseApp } from '../firebase/firebase-config';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';




export const AppRouter = () => {


  const dispatch =useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    
    const auth = getAuth(firebaseApp);
    
    onAuthStateChanged(auth, (async(user)=>{

      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

       
       dispatch(StartLoadingNotes(user.uid));
        
      }else{
        setIsLoggedIn(false)

      }

      setChecking(false)
        

    }));
  }, [dispatch,setChecking,setIsLoggedIn])
    

  if (checking) {
    return(
      <h1>Espere...</h1>
    )
    
  }
  
    
  



  return (
    <Router>
         <div >
             <Switch>
                 <PublicRoute path="/auth" component={AuthRouter}  isAunthenticated={isLoggedIn}/>
                 <PrivateRoute exact path="/" component={JournalScreen} isAunthenticated={isLoggedIn}/>
                 <Redirect to="/auth/login"/>
             </Switch>
         </div>
    </Router>
  )
}


