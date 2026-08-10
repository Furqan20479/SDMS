import { useState } from "react";

export default function useForm(intialValues){

    const [values, setValues] = useState(intialValues);

    const handleChange = async (e)=>{
        setValues({...values, [e.target.name]:e.target.value});
    };
 
    const resetForm = ()=> setValues(intialValues);

    return {values, setValues, handleChange,resetForm};
}


