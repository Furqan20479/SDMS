import ProductForm from "../pages/ProductForm";
import ProductList from "../pages/ProductList";
import { useState } from "react";
import {Routes, Route} from "react-router-dom";


export default function Index(){

   const [refreshFlag, setRefreshFlag] = useState(false);

   const refreshList = ()=> setRefreshFlag(!refreshFlag);

   return (
    <>
    
    <Routes>
        {/* <Route path="/" element={<Home />}/> */}
        <Route path="/" element={<ProductForm refreshList={refreshList}/>}/>
        <Route path="/productList" element={<ProductList key={refreshFlag}/>}/>
    </Routes>
    </>
   )

}