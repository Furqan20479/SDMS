const BASE_URL = "http://localhost:5000/api/daily-Sale";

const request = async (endpoint, method="GET", data=null)=>{

    try {
         const response = await fetch(endpoint,{
        method,
        headers:{"Content-Type":"application/json"},
        body: data ? JSON.stringify(data) : undefined
    });

    if(!response){
        throw new Error("Response not found");
    }
    return response.json();

    } catch (error) {
        throw new Error(error.message  || "Request Error");
        
    }
   
};


const addSale = (data)=>request(BASE_URL,"POST", data);
const getSale = ()=> request(BASE_URL);
const getById = (id) => request(`${BASE_URL}/${id}`);
const updateSale = (id,data)=> request(`${BASE_URL}/${id}`, "PUT", data);
const deleteSale = (id)=> request(`${BASE_URL}/${id}`,"DELETE");

export default {addSale,getSale,getById,updateSale,deleteSale};

        

    