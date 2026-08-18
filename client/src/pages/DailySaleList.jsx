import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import dailySaleServices from "../services/dailySale.services.js";

export default function DailySaleList() {
  const navigate = useNavigate();

  const { data, fetchData } = useFetch(dailySaleServices.getSale);

  const handleDelete = async (id) => {
    await dailySaleServices.deleteSale(id);
    fetchData();
  };

  return (
    <>
      <div className="content">
        <div className="card">
          {data?.map((sale) => (
            <div key={sale._id}>
              <strong>Date:{sale.date}</strong>
              <strong>Booker:{sale.booker}</strong>
              <strong>Shop:{sale.shop}</strong>
              <strong>
                Product:
                {sale.product?.name} -{sale.product?.flavour} -
                {sale.product?.gram}G
              </strong>
              <strong>Cartons:{sale.cartons}</strong>
              <strong>Pieces:{sale.pieces}</strong>
              <strong>Remarks:{sale.remarks}</strong>
              <button
                onClick={() => navigate("/daily-sale-form", { state: sale })}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(sale._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
