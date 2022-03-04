import  { useState } from 'react'

export const useForm = (initialState= {}) => {
    
    const [values, setValues] = useState(initialState);

    const reset=(nuevoStado=initialState)=>{
        setValues(nuevoStado);
    }    
    const handleInputChange=({target})=>{

        setValues({
            ...values,
            [target.name]:target.value
        });
    };

    return [values, handleInputChange,reset];
      

};