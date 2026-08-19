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
    <div className="hierarchy-wrapper">
    <div className="hierarchy">
     
        <div className="neu-title">Sales Form</div>
        <form onSubmit={handleSubmit}>
          <label className="neu-subtitle">Date</label>
          <input className="neu-input" 
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
          />
          <label className="neu-subtitle">Booker</label>
          <input className="neu-input"
            type="text"
            name="booker"
            value={values.booker}
            onChange={handleChange}
          />
          <label className="neu-subtitle">Shop</label>
          <input className="neu-input"
            type="text"
            name="shop"
            value={values.shop}
            onChange={handleChange}
          />
          <label className="neu-subtitle">Products</label>
          <select className="select" name="product" value={values.product} onChange={handleChange}>
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.flavour} - {product.gram}G
              </option>
            ))}
          </select>
          <label className="neu-subtitle">Cartons</label>
          <input className="neu-input"
            type="number"
            name="cartons"
            value={values.cartons}
            onChange={handleChange}
          />
          <label className="neu-subtitle">Pieces</label>
          <input className="neu-input"
            type="number"
            name="pieces"
            value={values.pieces}
            onChange={handleChange}
          />
          <label className="neu-subtitle">Remarks</label>
          <input className="neu-input"
            type="text"
            name="remarks"
            value={values.remarks}
            onChange={handleChange}
          />
          <br />
          <div class="button-group">
          <button type="submit" className="neu-button">
            {isEdit ? "Edit" : "Add"}
          </button>
          </div>
        </form>
        <div>
          <button className="neu-button" onClick={() => navigate("/daily-sale-list")}>
            Sale List
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
