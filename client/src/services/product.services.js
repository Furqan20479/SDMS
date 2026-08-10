 const BASE_URL = "http://localhost:5000/api/products";

 const request = async(endpoint, method="GET", data=null)=>{
    try {
        const result = await fetch(endpoint,{
            method,
            headers:{"Content-Type":"application/json"},
            body: data? JSON.stringify(data) : undefined
        });
    const response = await result.json();

    if(!result.ok){
        
        throw new Error(response.message || "Api Fail");
    };
    return response;

} catch (error) {
    throw new Error(error.message || "Api Fail");

    }
};

const create = (data)=> request(BASE_URL, "POST", data);
const get = (search="")=> request(`${BASE_URL}/?search=${search}`);
const getAll = ()=> request(BASE_URL);
const update = (id,data)=> request(`${BASE_URL}/${id}`, "PUT", data);
const del = (id) => request(`${BASE_URL}/${id}`, "DELETE");


export default {create, get, getAll, update, del};


 

