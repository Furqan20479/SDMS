import { useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import productServices from "../services/product.services.js";
import { useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch.js";


export default function ProductList(){

    const navigate = useNavigate();


    const {data,setMeta,fetchData} =useFetch(productServices.getAll);
    const {search, setSearch} = useSearch();

 
    
    const handleDelete = async (id)=>{
        await productServices.del(id);
        
    };
    
    const filterProducts = data?.filter(product=>
        (product.name || product.productName || "").toLowerCase().includes(search.toLowerCase()));

    return (
    <>

    <div>
        <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} />
    </div>
        <div className="list">
            {filterProducts?.map(product=>(
                <div key={product._id}>
                    <p><strong>Product Name</strong> {product.name}</p> 
                    <p><strong>Product Flavour</strong> {product.flavour}</p> 
                    <p><strong>Product Gram's</strong> {product.gram}</p> 
                    <p><strong>Product Price</strong> {product.price}</p>
                    <button className="btn" onClick={()=> navigate("/productForm",{state:product}) }>Edit</button> 
                    <button className="btn" onClick={()=> handleDelete(product._id)}>Delete</button> 
                </div>
            ))}
<div className="content-box">
            <button className="btn" onClick={()=>navigate("/productForm")}>Back To Form</button>
            <button className="btn" onClick={()=>navigate("/")}>Back To Home</button>

</div>
        </div>
    
    </>);
}


