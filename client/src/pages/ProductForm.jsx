import useForm from "../hooks/useForm.js";
import { useEffect } from "react";
import {useLocation,useNavigate} from "react-router-dom";
import productServices from "../services/product.services.js";


export default function ProductForm({refreshList}){
    
 const initialValues = {
    name: "",
    flavour: "",
    gram: "",
    price: ""
};

    const {values, setValues, handleChange, resetForm} = useForm(initialValues);


    const location = useLocation();
    const editData = location.state;
    const isEdit = Boolean(editData);
    const navigate = useNavigate();



    useEffect(()=>{
        if(editData){
            setValues(editData);
        }    
    },[editData]);    

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(editData){
            await productServices.update(editData._id, values);
            refreshList();
            resetForm();
            navigate("/productList");
        }else{
            await productServices.create(values);
             refreshList();
            resetForm();
        }
        };


        return (<>
        <div>


        <form className="form-data" onSubmit={handleSubmit}>
            <strong>Name</strong><input type="text" name="name" value={values.name} onChange={handleChange} /><br />
            <strong>Flavour</strong><input type="text" name="flavour" value={values.flavour} onChange={handleChange} /><br />
            <strong>Gram's</strong><input type="text" name="gram" value={values.gram} onChange={handleChange} /><br />
            <strong>Price</strong><input type="text" name="price" value={values.price} onChange={handleChange} /><br />
            <button className="btn-btn-primary">{isEdit ? "Edit" : "Add"}</button>

        </form>
            
            <button className="btn-btn-primary" onClick={()=> navigate("/productList")}>ProductPage</button>
            <button className="btn-btn-primary" onClick={()=> navigate("/")}>Back To Home</button>
        </div>
        
        </>);







}
