import useForm from "../hooks/useForm.js";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productServices from "../services/product.services.js";

export default function ProductForm({ refreshList }) {
  const initialValues = {
    name: "",
    flavour: "",
    gram: "",
    price: "",
  };

  const { values, setValues, handleChange, resetForm } = useForm(initialValues);

  const location = useLocation();
  const editData = location.state;
  const isEdit = Boolean(editData);
  const navigate = useNavigate();

  useEffect(() => {
    if (editData) {
      setValues(editData);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData) {
      await productServices.update(editData._id, values);
      refreshList();
      resetForm();
      navigate("/productList");
    } else {
      await productServices.create(values);
      refreshList();
      resetForm();
    }
  };

  return (
    <>
      <div>
        <div className="content-box">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="heading">Product Form</h2>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <br />
            <label>Flavour</label>
            <input
              type="text"
              name="flavour"
              value={values.flavour}
              onChange={handleChange}
            />
            <br />
            <label>Gram's</label>
            <input
              type="text"
              name="gram"
              value={values.gram}
              onChange={handleChange}
            />
            <br />
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
            <br />
            <button className="btn">
              {isEdit ? "Edit" : "Add"}
            </button>
          <div className="content-box">
            <button
              className="btn"
              onClick={() => navigate("/productList")}
            >
              ProductPage
            </button>
            <button className="btn" onClick={() => navigate("/")}>
              Back To Home
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
