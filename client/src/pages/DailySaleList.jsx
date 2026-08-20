import { useNavigate } from "react-router-dom";

import useFetch from "../hooks/useFetch.js";
import dailySaleServices from "../services/dailySale.services.js";


export default function DailySaleList() {

    const navigate = useNavigate();

    const {
        data,
        fetchData
    } = useFetch(dailySaleServices.getSale);


    const handleDelete = async (id) => {

        await dailySaleServices.deleteSale(id);

        fetchData();

    };


    return (

        <div className="hierarchy-wrapper">

            <div className="hierarchy">

                <div className="neu-title">
                    Sales Orders
                </div>


                {data?.map((sale) => (

                    <div
                        key={sale._id}
                        className="sale-bill"
                    >

                        {/* BILL HEADER */}

                        <div className="bill-header">

                            <div className="list-item">

                                <label className="lable">
                                    Date:
                                </label>

                                {new Date(
                                    sale.date
                                ).toLocaleDateString("en-GB")}

                            </div>


                            <div className="list-item">

                                <label className="lable">
                                    Booker:
                                </label>

                                {sale.booker}

                            </div>


                            <div className="list-item">

                                <label className="lable">
                                    Shop:
                                </label>

                                {sale.shop}

                            </div>

                        </div>


                        {/* PRODUCTS */}

                        <div className="bill-products">

                            <div className="list-item">

                                <strong>
                                    Products
                                </strong>

                            </div>


                            {sale.products?.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        className="product-item"
                                    >

                                        <div>

                                            {item.product?.name}
                                            {" - "}
                                            {item.product?.flavour}
                                            {" - "}
                                            {item.product?.gram}G

                                        </div>


                                        <div>

                                            Pieces:
                                            {" "}
                                            {item.pieces}

                                        </div>


                                        <div>

                                            Ctn:
                                            {" "}
                                            {(item.pieces / 40).toFixed(2)}

                                        </div>


                                        <div>

                                            Amount:
                                            {" "}
                                            {(
                                                item.product?.price *
                                                item.pieces
                                            ).toLocaleString()}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>


                        {/* BILL TOTAL */}

                        <div className="bill-total">

                            <div className="list-item">

                                <label className="lable">
                                    Total Pieces:
                                </label>

                                {sale.totalPieces}

                            </div>


                            <div className="list-item">

                                <label className="lable">
                                    Total Cartons:
                                </label>

                                {(sale.totalPieces / 40).toFixed(2)}

                            </div>


                            <div className="list-item">

                                <label className="lable">
                                    Total Amount:
                                </label>

                                {sale.amount?.toLocaleString()}

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="button-group">

                            <button
                                className="button"
                                onClick={() =>
                                    navigate(
                                        "/daily-sale-form",
                                        {
                                            state: sale
                                        }
                                    )
                                }
                            >
                                Edit
                            </button>


                            <button
                                className="button"
                                onClick={() =>
                                    handleDelete(sale._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}