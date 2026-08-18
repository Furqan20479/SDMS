import { useEffect } from "react";
import useForm from "../hooks/useForm.js";
import dailySaleServices from "../services/dailySale.services.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import productServices from "../services/product.services.js";


export default function DailySaleForm({ refreshList }) {


    const [products, setProducts] = useState([]);

  const initialValues = {
    date: "",
    booker: "",
    shop: "",
    product: "",
    cartons: "",
    pieces: "",
    remarks: "",
  };

  const { values, setValues, handleChange, resetForm } = useForm(initialValues);

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;
  const isEdit = Boolean(editData);

  useEffect(() => {
    if (editData) {
      setValues(editData);
    }
  }, [editData]);

  useEffect(()=>{
    const fetchProducts = async ()=>{
        try {
            const response = await productServices.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    fetchProducts();          
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        await dailySaleServices.updateSale(editData._id, values);
        resetForm();
        refreshList();
        navigate("/daily-sale-list");
      } else {
        await dailySaleServices.addSale(values);
        resetForm();
        refreshList();
      }
    } catch (error) {
      console.error(error.message || "DailySale Error");
    }
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="booker"
            value={values.booker}
            onChange={handleChange}
          />
          <input
            type="text"
            name="shop"
            value={values.shop}
            onChange={handleChange}
          />
          <select name="product" value={values.product} onChange={handleChange}>
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.flavour} - {product.gram}G
              </option>
            ))}
          </select>
          <input
            type="number"
            name="cartons"
            value={values.cartons}
            onChange={handleChange}
          />
          <input
            type="number"
            name="pieces"
            value={values.pieces}
            onChange={handleChange}
          />
          <input
            type="text"
            name="remarks"
            value={values.remarks}
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            {isEdit ? "Edit" : "Add"}
          </button>
        </form>
        <div>
          <button onClick={() => navigate("/daily-sale-list")}>
            Sale List
          </button>
        </div>
      </div>
    </>
  );
}
