import React from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';



export const PublicRoute = ({

    isAunthenticated,
    component:Component,
    ...rest
}) => {


    
    return(
        <Route {...rest}
            component={(props)=>(
                (isAunthenticated)
                    ?<Redirect to="/"/>
                    :<Component {...props}/> 
            )}
        

        />
    )
}


PublicRoute.propTypes={
    isAunthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}


