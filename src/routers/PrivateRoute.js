import React from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';



export const PrivateRoute = ({

    isAunthenticated,
    component:Component,
    ...rest
}) => {


    
    return(
        <Route {...rest}
            component={(props)=>(
                (isAunthenticated)
                    ?<Component {...props}/>
                    :<Redirect to="/auth/login"/>
            )}
        

        />
    )
}


PrivateRoute.propTypes={
    isAunthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}






