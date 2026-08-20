import { useEffect, useState } from "react";
import useForm from "../hooks/useForm.js";

import dailySaleServices from "../services/dailySale.services.js";
import productServices from "../services/product.services.js";

import { useLocation, useNavigate } from "react-router-dom";


export default function DailySaleForm({ refreshList }) {

    const [products, setProducts] = useState([]);

    const [saleProducts, setSaleProducts] = useState([]);

    const initialValues = {
        date: "",
        booker: "",
        shop: ""
    };

    const {
        values,
        setValues,
        handleChange,
        resetForm
    } = useForm(initialValues);

    const navigate = useNavigate();
    const location = useLocation();

    const editData = location.state;
    const isEdit = Boolean(editData);


    // -----------------------------
    // Fetch Products
    // -----------------------------

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await productServices.getAll();

                setProducts(response.data);

            } catch (error) {

                console.error(error.message);

            }
        };

        fetchProducts();

    }, []);


    // -----------------------------
    // Edit Data
    // -----------------------------

    useEffect(() => {

        if (editData) {

            setValues({
                date: editData.date?.split("T")[0] || "",
                booker: editData.booker || "",
                shop: editData.shop || ""
            });

            setSaleProducts(editData.products || []);
        }

    }, [editData]);


    // -----------------------------
    // Add Product Row
    // -----------------------------

    const addProduct = () => {

        setSaleProducts([
            ...saleProducts,
            {
                product: "",
                pieces: ""
            }
        ]);
    };


    // -----------------------------
    // Remove Product Row
    // -----------------------------

    const removeProduct = (index) => {

        setSaleProducts(
            saleProducts.filter((_, i) => i !== index)
        );
    };


    // -----------------------------
    // Product Change
    // -----------------------------

    const handleProductChange = (index, field, value) => {

        const updatedProducts = [...saleProducts];

        updatedProducts[index][field] = value;

        setSaleProducts(updatedProducts);
    };


    // -----------------------------
    // Total Pieces
    // -----------------------------

    const totalPieces = saleProducts.reduce(
        (total, item) => total + Number(item.pieces || 0),
        0
    );


    // -----------------------------
    // Total Cartons
    // -----------------------------

    const totalCartons = totalPieces / 40;


    // -----------------------------
    // Total Amount
    // -----------------------------

    const totalAmount = saleProducts.reduce(
        (total, item) => {

            const product = products.find(
                product => product._id === item.product
            );

            if (!product) {
                return total;
            }

            return total + (
                Number(product.price) *
                Number(item.pieces || 0)
            );

        },
        0
    );


    // -----------------------------
    // Submit
    // -----------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const saleData = {

                ...values,

                products: saleProducts.map(item => ({
                    product: item.product,
                    pieces: Number(item.pieces)
                }))

            };


            if (editData) {

                await dailySaleServices.updateSale(
                    editData._id,
                    saleData
                );

            } else {

                await dailySaleServices.addSale(
                    saleData
                );

            }


            resetForm();

            setSaleProducts([]);

            refreshList();

            navigate("/daily-sale-list");

        } catch (error) {

            console.error(
                error.message || "DailySale Error"
            );

        }

    };


    return (

        <div className="hierarchy-wrapper">

            <div className="hierarchy">

                <div className="neu-title">
                    {isEdit ? "Edit Sales Order" : "Sales Order"}
                </div>


                <form onSubmit={handleSubmit}>

                    {/* DATE */}

                    <label className="neu-subtitle">
                        Date
                    </label>

                    <input
                        className="neu-input"
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                    />


                    {/* BOOKER */}

                    <label className="neu-subtitle">
                        Booker
                    </label>

                    <input
                        className="neu-input"
                        type="text"
                        name="booker"
                        value={values.booker}
                        onChange={handleChange}
                    />


                    {/* SHOP */}

                    <label className="neu-subtitle">
                        Shop
                    </label>

                    <input
                        className="neu-input"
                        type="text"
                        name="shop"
                        value={values.shop}
                        onChange={handleChange}
                    />


                    {/* PRODUCTS */}

                    <label className="neu-subtitle">
                        Products
                    </label>


                    {saleProducts.map((item, index) => (

                        <div
                            key={index}
                            className="product-row"
                        >

                            <select
                                className="select"
                                value={item.product}
                                onChange={(e) =>
                                    handleProductChange(
                                        index,
                                        "product",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select Product
                                </option>

                                {products.map((product) => (

                                    <option
                                        key={product._id}
                                        value={product._id}
                                    >

                                        {product.name}
                                        {" - "}
                                        {product.flavour}
                                        {" - "}
                                        {product.gram}G

                                    </option>

                                ))}

                            </select>


                            <input
                                className="neu-input"
                                type="number"
                                min="1"
                                placeholder="Pieces"
                                value={item.pieces}
                                onChange={(e) =>
                                    handleProductChange(
                                        index,
                                        "pieces",
                                        e.target.value
                                    )
                                }
                            />


                            <button
                                type="button"
                                className="neu-button"
                                onClick={() =>
                                    removeProduct(index)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))}


                    {/* ADD PRODUCT */}

                    <div className="button-group">

                        <button
                            type="button"
                            className="neu-button"
                            onClick={addProduct}
                        >
                            + Add Product
                        </button>

                    </div>


                    {/* SUMMARY */}

                    <div className="sale-summary">

                        <strong>
                            Total Pieces: {totalPieces}
                        </strong>

                        <strong>
                            Total Cartons: {totalCartons}
                        </strong>

                        <strong>
                            Total Amount: {totalAmount}
                        </strong>

                    </div>


                    {/* SAVE */}

                    <div className="button-group">

                        <button
                            type="submit"
                            className="neu-button"
                        >
                            {isEdit ? "Update Order" : "Save Order"}
                        </button>

                    </div>

                </form>


                {/* LIST */}

                <div>

                    <button
                        className="neu-button"
                        onClick={() =>
                            navigate("/daily-sale-list")
                        }
                    >
                        Sale List
                    </button>

                </div>

            </div>

        </div>

    );
}