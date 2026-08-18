import ProductForm from "../pages/ProductForm";
import ProductList from "../pages/ProductList";
import { useState } from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import DailySaleForm from "../pages/DailySaleForm";
import DailySaleList from "../pages/DailySaleList";



export default function Index(){

   const [refreshFlag, setRefreshFlag] = useState(false);

   const refreshList = ()=> setRefreshFlag(!refreshFlag);

   return (
    <>
    
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/productForm" element={<ProductForm refreshList={refreshList}/>}/>
        <Route path="/productList" element={<ProductList key={refreshFlag}/>}/>
        <Route path="/daily-sale-form" element={<DailySaleForm refreshList={refreshList}/>}/>
        <Route path="/daily-sale-list" element={<DailySaleList key={refreshFlag}/>}/>
    </Routes>
    </>
   )

}