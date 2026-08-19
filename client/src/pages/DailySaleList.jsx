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
      <div className="hierarchy-wrapper">
        <div className="hierarchy">
          {data?.map((sale) => (
            <div key={sale._id}>
              <div className="list-item">
            <label className="lable"> Date:</label>
             {new Date(sale.date).toLocaleDateString("en-GB")}
              </div>
              <div className="list-item">
                 <label className="lable"> Booker:</label>
              {sale.booker}
              </div>
              <div className="list-item">
              Shop:{sale.shop}
              </div>
              <div className="list-item">
             
                Product:
                {sale.product?.name} -{sale.product?.flavour} -
                {sale.product?.gram}G
              
              </div>
<div className="list-item">
              Cartons:{sale.cartons}

</div>
<div className="list-item">

             Pieces:{sale.pieces}
</div>
<div className="list-item">
  
             Remarks:{sale.remarks}
</div>
<br />
<div className="button-group">
              <button className="button"
                onClick={() => navigate("/daily-sale-form", { state: sale })}
              >
                Edit
              </button>
              
              <button className="button" onClick={() => handleDelete(sale._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
